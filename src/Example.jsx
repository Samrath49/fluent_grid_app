import { useState } from "react";
import {
  EditRegular,
  OpenRegular,
  VideoPersonRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  Link,
  TableCellLayout,
  createTableColumn,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@fluentui/react-components";
import { UpdatePersonForm } from "./Components";
import update from "immutability-helper";

const columns = [
  createTableColumn({
    columnId: "job",
    compare: (a, b) => {
      return a.job.label.localeCompare(b.job.label);
    },
    renderHeaderCell: () => {
      return "Designation";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.job.icon}>
          {item.job.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn({
    columnId: "name",
    compare: (a, b) => {
      return a.name.label.localeCompare(b.name.label);
    },
    renderHeaderCell: () => {
      return "Name";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.name.label}
              name={item.name.label}
              badge={{ status: item.name.status }}
            />
          }
        >
          {item.name.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn({
    columnId: "age",
    compare: (a, b) => {
      return a.age.label.localeCompare(b.age.label);
    },
    renderHeaderCell: () => {
      return "Age";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.age.label}</TableCellLayout>;
    },
  }),
  createTableColumn({
    columnId: "currentExp",
    compare: (a, b) => {
      return a.currentExp.label.localeCompare(b.currentExp.label);
    },
    renderHeaderCell: () => {
      return "Experience";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.currentExp.label}</TableCellLayout>;
    },
  }),
  createTableColumn({
    columnId: "singleAction",
    renderHeaderCell: () => {
      return "Single action";
    },
    renderCell: () => {
      return (
        <Button icon={<OpenRegular />}>
          <Link href="https://www.google.com/" target="_blank">
            Open
          </Link>
        </Button>
      );
    },
  }),
  createTableColumn({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: (item, onEditClick, onDeleteClick, onAddPerson) => {
      return (
        <>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button
                aria-label="Edit"
                icon={<EditRegular />}
                onClick={(e) => onEditClick(e, item)}
              />
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Edit data.</DialogTitle>
                <DialogContent>
                  Update the fields of the following values as per your
                  requirement.
                  <UpdatePersonForm item={item} onAddPerson={onAddPerson} />
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>

          <Button
            aria-label="Delete"
            icon={<DeleteRegular />}
            onClick={(e) => onDeleteClick(e, item)}
          />
        </>
      );
    },
  }),
];

const getCellFocusMode = (columnId) => {
  switch (columnId) {
    case "singleAction":
      return "none";
    case "actions":
      return "group";
    default:
      return "cell";
  }
};

const Example = ({ items, setItems }) => {
  const handleEdit = (e, item) => {
    e.stopPropagation();
  };

  const handleDelete = (e, item) => {
    e.stopPropagation();
    const updatedItems = items?.filter((element) => item !== element);
    setItems(updatedItems);
    localStorage.setItem("ITEM_DATA", JSON.stringify(updatedItems));
  };

  const handleAddPerson = (newPerson) => {
    const indexOfItemToUpdate = items.findIndex(
      (item) => item.job.label === newPerson.job.label
    );

    if (indexOfItemToUpdate !== -1) {
      const updatedItems = items.map((item, index) =>
        index === indexOfItemToUpdate ? { ...item, ...newPerson } : item
      );

      setItems(updatedItems);
      localStorage.setItem("ITEM_DATA", JSON.stringify(updatedItems));
    } else {
      const updatedItems = update(items, {
        $push: [newPerson],
      });

      setItems(updatedItems);
      localStorage.setItem("ITEM_DATA", JSON.stringify(updatedItems));
    }
  };

  return (
    <>
      <DataGrid
        items={items}
        columns={columns}
        sortable={true}
        selectionMode="single"
        getRowId={(item) => item.job.label}
        onSelectionChange={(e, data) => console.log(data)}
        style={{ minWidth: "75rem" }}
      >
        <DataGridHeader>
         { <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>}
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow
              key={rowId}
              selectionCell={{ "aria-label": "Select row" }}
            >
              {({ renderCell, columnId }) => (
                <DataGridCell focusMode={getCellFocusMode(columnId)}>
                  {renderCell(item, handleEdit, handleDelete, handleAddPerson)}
                </DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};

export default Example;
