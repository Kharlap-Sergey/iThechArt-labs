--олучить информацию о кодах, названиях отделов и числе работающих в них в настоящее время сотрудников.
with short_log as (
    select
        career.department_kod,
        COUNT(employee.*) as "workers"
    from
        career
        INNER JOIN employee on employee.kod = career.employee_kod
    where
        employee.kod in (
            select
                employee_kod
            from
                career as cr
            where
                career.department_kod = cr.department_kod
        )
    group by
        career.department_kod
)
select
    department.kod,
    department.name,
    short_log.workers
from
    department
    Right JOIN short_log ON short_log.department_kod = department.kod