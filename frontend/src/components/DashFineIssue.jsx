import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
  Select,
  FileInput,
  Alert,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const DashFineIssue = () => {
  return (
    <div className=" min-h-screen  max-w-lg p-3 mx-auto ">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Issue Fine Sheet
          </h2>
        </div>
      </div>

      <div className=" pt-14 ">
        <div>
          <form className="gap-4  max-w-screen-2xl">
            <div>
              <div className="mb-2 block">
                <Label value="Driver Id" />
              </div>
              <TextInput id="dId" type="text" required shadow />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Driver Name" />
              </div>
              <TextInput id="dName" type="text" required shadow />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Vehicle Number" />
              </div>
              <TextInput id="vNo" type="text" required shadow />
            </div>

            <div className="flex  gap-2 items-center justify-between ">
              <div>
                <div className="mb-2 block">
                  <Label value=" Issue Date" />
                </div>
                <div>
                  <Datepicker />
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value=" Time" />
                </div>
                <div>
                  <Datepicker />
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="Place" />
                </div>
                <TextInput id="place" type="text" required shadow />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="Expire Date" />
                </div>
                <div>
                  <Datepicker />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="violation" value="Violation" />
              </div>
              <Select id="violation" required>
                <option>Select Violation</option>
                <option>High Speed</option>
                <option>Cross The Line</option>
                <option>Drink Alcohol</option>
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Police Officer Id" />
              </div>
              <TextInput id="pId" type="text" required shadow />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Police Officer Name" />
              </div>
              <TextInput id="pName" type="text" required shadow />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Police Station" />
              </div>
              <TextInput id="pStation" type="text" required shadow />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="state" value="State" />
              </div>
              <Select id="state" required>
                <option>False</option>
                <option>True</option>
              </Select>
            </div>

            <div className="mb-2 block pt-4">
              <Button type="submit" className="w-full">
                Issue Fine Sheet
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
