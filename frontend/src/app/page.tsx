'use client'


export default function Home() {
  function handleClick(location: any) {
    window.location.href = location
  }

  return (
    <main className="bg-slate-50 text-black">
      <div className="h-fit">
        <div className="h-52 font-sans font-bold text-6xl flex justify-center items-center">
          Ristek Task API Testing
        </div>
        <div>
          <div className="pr-10 pl-10 mb-12">
            <div className="flex flex-row select-none font-sans">
              <div className="w-1/2 h-fit m-2 p-2 rounded-md shadow-lg bg-white">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Person Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/person")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-fit bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-2 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Schedule Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/schedule")}>
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
              <div className="w-1/2 h-fit bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-2 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Core Comitte Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/coreComitte")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-fit m-2 p-2 rounded-md shadow-lg bg-white">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Daily Comitte Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/dailyComitte")}>
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
              <div className="w-1/2 h-fit m-2 p-2 rounded-md shadow-lg bg-white">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Sponsor Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/sponsor")}>
                    <div className="mr-2 text-sm">Check</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-fit bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-2 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Event Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/event")}>
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
              <div className="w-1/2 h-fit bg-rose-200 m-2 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-2 rounded-md shadow-lg hover:from-sky-500 hover:via-emerald-500 hover:to-indigo-500">
                <div className="bg-white w-full h-full rounded-md p-4">
                  <div className="font-semibold font-sans text-3xl ">Group Table</div>
                  <div className="mt-4 font-light text-sm">Defined as table that hold the information of someone relative to their position as an University of Indonesia student. As such if a person is an UI student it will be contain id, name, status, faculty, major, batch, entry process and occupation. As for non University of Indonesia student it will contain an id, name, status, and occupation.</div>
                  <div className="flex flex-row mt-5 bg-slate-200 w-fit p-2 rounded-md hover:scale-105 hover:bg-slate-300" onClick={() => handleClick("/group")}>
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
      </div>
    </main>
  );
}
