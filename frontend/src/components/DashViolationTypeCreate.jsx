import React from "react";
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

export const DashViolationTypeCreate = () => {
  return (
    <div className="  max-w-lg p-3 mx-auto">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Violation Rule<br></br>And<br></br> Information
          </h2>
        </div>
      </div>

      <div className=" pt-20 ">
        <div>
          <form className="gap-4  ">
            <div>
              <div className="mb-2 block">
                <Label
                  value="
                     Type"
                />
              </div>
              <TextInput id="type" type="text" required shadow />
            </div>

            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <div>
              <div className="mb-2 block">
                <Label
                  value="
                     Price"
                />
              </div>
              <TextInput id="price" type="text" required shadow />
            </div>

            <div className="pt-4 ">
              <Button type="submit" className="w-full">
                Add violation rule
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
