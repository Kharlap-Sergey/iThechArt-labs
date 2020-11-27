--список работников получивших зп 2 2015
select
    "FCs"
from
    employee
where
    "kod" in (
        SELECT
            employee_kod
        from
            salary
        where
            (
                "month" = 2
                and "year" = 2015
            )
    );