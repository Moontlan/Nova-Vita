"use client";
import React, { useState, useEffect } from "react";
import { storage } from "../../lib/firebase.js";
import { ref, uploadBytes } from "firebase/storage";

function Report() {

  const mockReport = [
    {
      Name: "John Doe",
      description: "Donation for charity",
      quantity: 100,
      donationDate: "2022-01-01",
    },
    {
      Name: "Jane Doe",
      description: "Donation for education",
      quantity: 200,
      donationDate: "2022-02-01",
    },
    {
      Name: "Alice Smith",
      description: "Donation for healthcare",
      quantity: 150,
      donationDate: "2022-03-01",
    },
    {
      Name: "Bob Johnson",
      description: "Donation for environment",
      quantity: 300,
      donationDate: "2022-04-01",
    },
    {
      Name: "Charlie Brown",
      description: "Donation for animal welfare",
      quantity: 250,
      donationDate: "2022-05-01",
    },
    {
      Name: "David Williams",
      description: "Donation for arts",
      quantity: 350,
      donationDate: "2022-06-01",
    },
    // Add more objects as needed
  ];

  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
    // Agrega más campos aquí según sea necesario
  });

  const [report, setReport] = useState([]);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/reports/getAllDonationsByDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        setReport(data.donations);
      })
      .catch((error) => {
        confirm(error.message);
        console.error("Error al enviar los datos:", error);
      });
  };

  return (
    <form
      class="pb-10 pt-10 flex flex-col items-center justify-center bg-white"
      onSubmit={handleSubmit}
    >
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Reporte de donaciones
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Ingrese la fecha de inicio y de fin para generar el reporte de
            donaciones.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-2">
              <label
                for="region"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha Inicio
              </label>
              <div class="mt-2">
                <input
                  required
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formValues.startDate}
                  onChange={handleChange}
                  autocomplete="address-level1"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="postal-code"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha Fin
              </label>
              <div class="mt-2">
                <input
                  required
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formValues.endDate}
                  onChange={handleChange}
                  autocomplete="postal-code"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                class="mt-8 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-4 font-medium text-gray-900 text-center"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 font-medium text-gray-900 text-center"
                >
                  Descripcion
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 font-medium text-gray-900 text-center"
                >
                  Monto
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 font-medium text-gray-900 text-center"
                >
                  Fecha Donacion
                </th>
              </tr>
            </thead>
            <tbody>
              {mockReport.map((r) => {
                return (
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-center">{r.Name}</td>
                    <td class="px-6 py-4 text-center">{r.description}</td>
                    <td class="px-6 py-4 text-center">
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                        {r.quantity}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">{r.donationDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
}

export default Report;
