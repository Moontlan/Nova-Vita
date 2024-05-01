"use client";
import React, { useState } from "react";
import Map from "../components/Map/map";

function Nursing() {
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

  const handleMarkerPositionChange = (position) => {
    setMarkerPosition(position);
  };

  const [formValues, setFormValues] = useState({
    firstName: "",
    firstLastName: "",
    secondLastName: "",
    nit: "",
    representative: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
    location: "",
  });

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
    // Enviar los datos a la base de datos
    fetch("http://localhost:3000/api/institutions/createInstitution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        confirm("pisitivo");
        // Realizar acciones después de enviar los datos a la base de datos
        console.log("Datos enviados exitosamente:", data);
        // Restablecer los valores del formulario si es necesario
      })
      .catch((error) => {
        confirm("algo salio mal");
        console.error("Error al enviar los datos:", error);
        // Manejar el error de acuerdo a tus necesidades
      });
  };
  return (
    <form
      className="flex flex-col items-center justify-center h-screen bg-white  pt-[70px] mb-[70px]"
      onSubmit={handleSubmit}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            REGISTRO ASILO
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                for="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre / Razon Social
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formValues.firstName}
                  onChange={handleChange}
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                for="representative"
                className="pl-3 block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre Representate
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="representative"
                  id="representative"
                  value={formValues.representative}
                  onChange={handleChange}
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                for="nit"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                NIT
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nit"
                  id="nit"
                  value={formValues.nit}
                  onChange={handleChange}
                  autocomplete="family-name"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  autocomplete="email"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                for="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Direccion
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formValues.address}
                  onChange={handleChange}
                  autocomplete="address"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                for="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Celular
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  autocomplete="phone"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                for="mobile"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefono
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formValues.mobile}
                  onChange={handleChange}
                  autocomplete="mobile"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Map onMarkerPositionChange={handleMarkerPositionChange}></Map>
      <input
        type="hidden"
        name="mobile"
        id="mobile"
        value={markerPosition[0] + " " + markerPosition[1]}
        onChange={handleChange}
        autocomplete="mobile"
        className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}

export default Nursing;