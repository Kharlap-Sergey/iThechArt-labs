--имя самого немолодго 
select
    "birth_date",
    "FCs"
from
    employee
where
    "birth_date" in (
        SELECT
            "birth_date"
        from
            employee
        order by
            "birth_date"
        fetch first
            1 row only
    )