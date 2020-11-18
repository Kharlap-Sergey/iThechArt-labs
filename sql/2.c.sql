--Найти коды работников, заработная плата которых в мае 2015 года; снизилась по сравнению с каким-либо предыдущим месяцем этого же года;
select
    distinct sl.employee_kod
from
    salary as sl
where
    sl.employee_kod in (
        select
            employee_kod
        from
            salary
        where
            month = 5
            and year = 2015
    )
    and sl.money > (
        select
            sum(sl1.money)
        from
            salary as sl1
        where
            sl.employee_kod = sl1.employee_kod
            and month = 5
            and year = 2015
        fetch first
            1 row only
    )