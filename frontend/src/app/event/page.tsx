'use client'

import React, { useState, useEffect } from "react";
import axios, { formToJSON } from "axios";

export default function Person() {
    const endRoot = "http://localhost:4000/"
    const table = "event"
    const endpoint = [
        "/",
        "/",
        "/:id",
        "/updateSchedule/:id",
        "/addDeleteSponsor/:id",
        "/updateGroupSpeaker/:id",
        "/:id",
    ]
    const endpointRequest = [
        "/",
        "/",
        "/",
        "/updateSchedule",
        "/addDeleteSponsor",
        "/updateGroupSpeaker",
        "/",
    ]

    const requestMethod = [
        "post",
        "get",
        "get",
        "patch",
        "patch",
        "patch",
        "delete"
    ]

    const requestTitle = [
        "CREATE an event",
        "GET All event",
        "GET an event by Id",
        "UPDATE Schedule",
        "DELETE and ADD sponsor",
        "Update the speaker",
        "DELETE an Event"
    ]

    const defaultBodyJson = [
        {
            title: "OKK UI",
            schedule: "65e7cd9cacd607a42ed35f0c",
            eventSponsor: [{
                "name": "BCA",
                "package": "Silver"
            }],
            eventSpeaker: "65e87d9a2649285ef64f106c"
        },
        {},
        {},
        {
            schedule: "65e7cd9cacd607a42ed35f0c"
        },
        {
            addData: [
                { "name": "BCA", "package": "Silver" },
                { "name": "BRI", "package": "Gold" }
            ],
            deleteData: [
                { "name": "BCA", "package": "Gold" }
            ]
        },
        {
            speaker: "65e87d9a2649285ef64f106c"
        },
        {}
    ]

    const defaultParam = [
        "",
        "",
        "65e88413090a2a72976f4419",
        "65e88413090a2a72976f4419",
        "65e88413090a2a72976f4419",
        "65e88413090a2a72976f4419",
        "65e88413090a2a72976f4419",
    ]

    function beautifyJson(data: object) {
        return JSON.stringify(data, undefined, 4);
    }


    function handleEdit(data: any) {
        const element = data.parentElement.parentElement.parentElement.nextSibling.nextSibling;
        const element2 = data.parentElement.parentElement.parentElement.nextSibling.nextSibling.nextSibling.nextSibling;
        if (element) {
            element.readOnly = false;
            element.style.backgroundColor = "#e2e8f0";
            element2.readOnly = false;
            element2.style.backgroundColor = "#e2e8f0";

        }
    }

    function handleCopyRight(data: any) {
        const element = data.parentElement.parentElement.parentElement.nextSibling;
        if (element) {
            navigator.clipboard.writeText(element.value)
            alert("Succes copy JSON data!")
        }
    }

    function handleCopyLeft(data: any) {
        const element = data.parentElement.parentElement.parentElement.nextSibling.nextSibling.nextSibling.nextSibling;
        if (element) {
            navigator.clipboard.writeText(element.value)
            alert("Succes copy JSON data!")
        }
    }

    async function handleRun(data: any, index: number) {
        try {
            const ouputPlace = data.target.parentElement.parentElement.parentElement.parentElement.nextSibling.firstChild.nextSibling;
            const inputParams = data.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.value;
            const inputBody = data.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.value;
            let url = endRoot + table + endpointRequest[index];
            console.log(inputParams)
            if (defaultParam[index] != "") {
                url += '/' + inputParams;
            }

            let err = {}
            axios.interceptors.response.use(function (config) {
                return config;
            }, function (error) {
                err = error.response.data
                return Promise.reject(error);
            });


            axios({
                method: requestMethod[index],
                url: url,
                timeout: 10000,
                data: JSON.parse(inputBody)
            })
                .then((response) => {
                    ouputPlace.value = beautifyJson(response.data)
                })
                .catch(error => {
                    ouputPlace.value = beautifyJson(err) || error
                })

        }
        catch (err) {
            console.log(err)
        }
    }

    function peopleRequest() {
        let request = []
        for (let i = 0; i < endpoint.length; i++) {
            const currentDiv =
                <div className="mb-10 border-2 shadow-sm pl-4 pr-4 pb-4 rounded-md bg-white flex lg:flex-row sm:flex-col">
                    <div className="lg:w-1/2 m-2">
                        <div className="flex flex-row w-full h-24">
                            <div className="w-1/2 flex justify-center font-bold flex-col">
                                <div className="text-3xl">
                                    {requestTitle[i]}
                                </div>
                                <div className="text-sm font-sans font-light">endpoint: {table + endpoint[i]}</div>
                            </div>
                            <div className="w-1/2 flex flex-row justify-end items-center">
                                <div className="relative h-12 aspect-square rounded-full bg-slate-200 flex items-center justify-center mr-2 hover:bg-slate-300 hover:scale-105">
                                    <div className="absolute h-full w-full bg-none rounded-full" onClick={(e) => handleEdit(e.target)}></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </div>
                                <div className="relative h-12 aspect-square rounded-full bg-slate-200 flex items-center justify-center mr-2 hover:bg-slate-300 hover:scale-105">
                                    <div className="absolute h-full w-full bg-none rounded-full" onClick={(e) => handleCopyLeft(e.target)}></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                    </svg>
                                </div>
                                <div className="relative h-12 aspect-square rounded-full bg-slate-200 flex items-center justify-center mr-2 hover:bg-slate-300 hover:scale-105">
                                    <div className="absolute h-full w-full bg-none rounded-full " onClick={(e) => handleRun(e, i)}></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        Params:
                        <textarea id="0" className="rounded-md shadow-sm h-11  w-full resize-none bg-slate-300 outline-none p-3 font-mono text-sm" readOnly>
                            {defaultParam[i]}
                        </textarea>
                        Body:
                        <textarea className="rounded-md shadow-sm h-56 w-full resize-none bg-slate-300 outline-none p-3 font-mono text-sm" readOnly>
                            {beautifyJson(defaultBodyJson[i])}
                        </textarea>
                    </div>
                    <div className="lg:w-1/2 m-2">
                        <div className="flex flex-row w-full h-24 items-center">
                            <div className="w-1/2 flex items-center text-3xl font-bold">
                                Response
                            </div>
                            <div className="w-1/2 flex justify-end">
                                <div className="relative h-12 aspect-square rounded-full bg-slate-200 flex items-center justify-center mr-2 hover:bg-slate-300 hover:scale-105">
                                    <div className="absolute h-full w-full bg-none rounded-full " onClick={(e) => handleCopyRight(e.target)}></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <textarea className="rounded-md shadow-sm h-80 w-full resize-none bg-slate-300 outline-none p-3 font-mono text-sm" readOnly></textarea>
                    </div>
                </div>

            request.push(currentDiv)
        }
        return request
    }

    return (
        <main className="pr-10 pl-10 pb-10 h-fit w-full bg-slate-100 font-sans text-black">
            <div className="flex flex-col justify-center h-48">
                <div className="text-5xl font-bold">{table.toLocaleUpperCase()} Table</div>
                <div className="text-md mt-1 font-light">API Testing: <a className="underline underline-offset-2" href="https://docs.google.com/document/d/1bX8n4rNvHoRth4UW7Lu-vHjo0sLX2iPEEagW8hCrL6M/edit?usp=sharing">Documentation</a></div>
            </div>

            {
                peopleRequest().map(element => (
                    element
                ))
            }

        </main >
    )
}