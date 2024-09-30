import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <div className="  h-screen  bg-cover bg-no-repeat bg-center relative overflow-hidden bg-[url('https://static.vecteezy.com/system/resources/previews/001/222/760/non_2x/police-officer-writing-a-ticket-vector.jpg')] ">
        <div>
          <div className="mt-4 mx-3 ">
            <Header />
          </div>

          <div className="pt-28 ">
            <h4 className="text-center text-5xl text-blue-50 ">
              Enhanced Traffic Violation Management System <br />
              for Sri Lanka
            </h4>

            <p className="text-justify mx-32 mt-24 text-base text-black bg-slate-200 p-3 ">
              The Enhanced Traffic Violation Management System for Sri Lanka
              aims to modernize how traffic fines are handled, providing a
              convenient online payment system for drivers to pay fines
              securely. Additionally, police officers can issue penalty sheets
              directly through the system, streamlining the process of managing
              violations. This system helps improve efficiency, reduce manual
              work, and ensure timely reminders for unpaid fines.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div></div>
      </div>
    </>
  );
}
