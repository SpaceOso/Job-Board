package tech.spaceoso.jobboard.controller;

import tech.spaceoso.jobboard.model.Employee;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class EmployeeStub {
    private static Map<Long, Employee> Employees = new HashMap<Long, Employee>();

    static{
        Employee employeea = new Employee(1L, new Date(), "Miguel", "Rico", "miguelrico3d@gmail.com", "abc123");
        Employees.put(1L, employeea);
        Employee employeeb = new Employee(2L, new Date(), "Ashley", "Rico", "ashleyrico@gmail.com", "123abc");
        Employees.put(2L, employeeb);
        Employee employeec = new Employee(3L, new Date(), "Ronnie", "Rico", "jerkface@gmail.com", "666abc");
        Employees.put(3L, employeec);
    }

    public static Employee getEmployeeById(Long id){
        return Employees.get(id);
    }

}
