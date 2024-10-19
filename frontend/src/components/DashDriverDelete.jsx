import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const DashDriverDelete = () => {
  return (
    <div className="min-h-screen">
      <div>
        <div className="text-center text-teal-700">
          <h2 className="font-bold text-3xl sm:text-5xl pt-10">
            Driver Delete
          </h2>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-10 mb-14 px-5 pt-10">
          <div className="mb-2 block">
            <Label value="id" />
          </div>

          <div>
            <TextInput id="id" type="text" required shawod />
          </div>

          <div>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="table-auto overflow-x-scroll md:w-full md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <>
          <Table hoverable className="shadow-md ">
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Station</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
          </Table>
        </>
      </div>
    </div>
  );
};
