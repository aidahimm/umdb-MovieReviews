`
//LOAD CSV FILE FROM Neo4j Browser
//Loading CSV with Nodes
load csv with headers from
"file:///users_tess.csv"
as nodes
create (n {type:nodes.lable,name:nodes.user_name})
return n
`
//
//
`
//Assign labels for Nodes
match (m {type:"User"})
set m:User
return m
`
//create a relationship
`
MATCH
  (a:Person),
  (b:Person)
WHERE a.name = 'A' AND b.name = 'B'
CREATE (a)-[r:RELTYPE]->(b)
RETURN type(r)
`
// movies for test
`


`
// recommndation engine, basically in python 
//https://giters.com/cuigm85/neo4j-movielens#requirements