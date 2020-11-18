--Найти имена тех работников, начисленная заработная плата которых за январь 2015 превысила 1000;
select
    "FCs"
from
    employee
where
    "kod" in(
        select
            "employee_kod"
        from
            salary
        where
            (
                "year" = 2015
                and "month" = 1
                and "money" > 1000
            )
    )