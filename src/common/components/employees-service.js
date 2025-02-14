import { API_URL } from "../constants/env-constants";
import { EmployeesByIdUrl, EmployeesUrl } from "./api-routes";

export const GetAllEmployees = async (signal) => {
  const response = await fetch(`${API_URL}${EmployeesUrl.get()}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    signal,
  });
  const { data } = await response.json();
  return data;
};

export const CreateEmployee = async (employee, signal) => {
  const response = await fetch(`${API_URL}${EmployeesUrl.post(employee.id)}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(employee),
    signal,
  });
  const { data } = await response.json();
  return data;
};

export const UpdateEmployeeById = async (employee, signal) => {
  const response = await fetch(
    `${API_URL}${EmployeesByIdUrl.put(employee.id)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(employee),
      signal,
    }
  );
  const { data } = await response.json();
  return data;
};

export const DeleteEmployeeById = async (employeeId, signal) => {
  return await fetch(
    `${API_URL}${EmployeesByIdUrl.delete(employeeId)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      signal,
    }
  );
};
