/* update warehouse set id=217 where id=117; */
/* update warehouse set id=117 where id=119; */
/* update warehouse set id=119 where id=217; */
/* update orders_item set item=217 where item=117; */
/* update orders_item set item=117 where item=119; */
/* update orders_item set item=119 where item=217; */
/* alter table orders add order_type char(10) default 'consumable'; */
/* alter table orders_item add msg char(50) default ''; */
/* alter table warehouse add item_type int default 0; */
/* ALTER TABLE warehouse ADD item_order int NOT NULL DEFAULT (0); */
/* Update warehouse SET item_order = id Where item_order = 0; */
alter table users add name char(10); 
