--Найти имена работников и стаж их непрерывной работы (на одной должности и в одном отделе).
select
    "FCs",
    career.termination_date - career.hiring_date as "dayes"
from
    employee
    INNER JOIN career ON career.employee_kod = employee.kod