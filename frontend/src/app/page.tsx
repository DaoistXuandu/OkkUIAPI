'use client'

export default function Home() {
  function handleClick(location: any) {
    window.location.href = location
  }

  return (
    <main className="pb-10 bg-slate-50 text-black">
      <div className="h-fit">
        <div className="h-52 font-sans font-bold text-6xl flex justify-center items-center">
          Ristek Task API Testing
        </div>
        <div>
          <div className="pr-10 pl-10 mb-12">
            <div className="flex flex-row select-none font-sans">
              <div className="w-1/2 h-56 m-2 p-1 rounded-md shadow-lg bg-white">
                <div className="relative bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Person Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="absolute bottom-3 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/person")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-56 bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-1 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
                <div className="relative bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Schedule Table</div>
                  <div className="mt-4 font-light text-sm">
                    Defined as table that hold the information of an activities, such as it will contain attribute like name of the activity, place where it will be held, time of start and end, person who will present during the activity where it will be referencing to a person from person table and also notulen or result of the activity
                  </div>
                  <div className="absolute bottom-3 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/schedule")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pr-10 pl-10 mb-12">
            <div className="flex flex-row select-none font-sans">
              <div className="relative w-1/2 h-56 bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-1 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Core Comitte Table</div>
                  <div className="mt-4 font-light text-sm">
                    Defined as table that hold the information of a core comitte division an person who will be in charge of it. As such it will contain the name of comitte and also an id referencing to the person table about a person who will be in charge of it.
                  </div>
                  <div className="absolute bottom-4 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/coreComitte")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-56 m-2 p-1 rounded-md shadow-lg bg-white">
                <div className="relative bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Daily Comitte Table</div>
                  <div className="mt-4 font-light text-sm">
                    Defined as table that hold the information of a certain division of a daily comitte, as such it will contain name of the division, member of the division where all will be referencing a distinc person from person table where it will have a pic, 2 vpic and several staff and also list of meet where it will be referencing an item from schedule table
                  </div>
                  <div className="absolute bottom-3 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/dailyComitte")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pr-10 pl-10 mb-12">
            <div className="flex flex-row select-none font-sans">
              <div className="w-1/2 h-56 m-2 p-1 rounded-md shadow-lg bg-white">
                <div className="relative bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Sponsor Table</div>
                  <div className="mt-4 font-light text-sm">
                    Defined as table that hold the information of sponsor package such as it contain the name of package, price for acquired it and also list of benefit from such a sponsor
                  </div>
                  <div className="absolute bottom-3 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/sponsor")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-56 bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-1 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
                <div className="relative bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Event Table</div>
                  <div className="mt-4 font-light text-sm">
                    Defined as table that hold the information of an event in the OKK UI. As such it contain attributes like name of the event, schedule of the event where it will be from schedule table, list of sponsor where it has name of the sponsor and package where the package will come from sponsor table and group of speaker where it will be an id from person group table.
                  </div>
                  <div className="absolute bottom-3 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/event")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pr-10 pl-10 mb-12">
          <div className="flex flex-row select-none font-sans">
            <div className="w-1/2 h-56 bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-1 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
              <div className="relative bg-white w-full h-full rounded-md p-4">
                <div className="font-semibold font-sans text-3xl ">Group Table</div>
                <div className="mt-4 font-light text-sm">
                  Defined as table that hold the information of an event in the OKK UI. As such for each event contain several attributes, like title or the name of the event, schedule of the event, list sponsor of the event and group of speaker for the event. Where schedule will contain an id from schedule table, sponsor from sponsor table and speaker from group of person table.
                </div>
                <div className="absolute bottom-3 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/group")}>
                  <div className="mr-2 text-sm">Check</div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-56 m-2 p-1 rounded-md shadow-lg bg-white">
              <div className="relative bg-white w-full h-full rounded-md p-4">
                <div className="font-semibold font-sans text-3xl ">Group Of People Table</div>
                <div className="mt-4 font-light text-sm">
                  Defined as table that hold the information of a group of people as already exist in people table. As such table contains two attribute title as the name of the group or function created such a group and member where it's an array of id from person that already intialize in person table
                </div>
                <div className="absolute bottom-3 flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/peopleGroup")}>
                  <div className="mr-2 text-sm">Check</div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
