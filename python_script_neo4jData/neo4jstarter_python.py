#Basic imports
import secrets,string
from neo4j import GraphDatabase
import pandas as pd
import random
#
#Create a Neo4j database connection
db_uri = "bolt://localhost:7687" 
db_username='neo4j'
db_passwrd='123'
conn = GraphDatabase.driver(db_uri, auth=(db_username, db_passwrd))
#
def watchlistname_generator():
    watchlistnames = ''.join(secrets.choice(string.ascii_letters + string.digits) for x in range(10))  
    return watchlistnames
#
#Nodes
def create_user_node(tx):
    data=pd.read_csv('test_data.csv')
    data.fillna(value ='User_X',inplace = True)
    for i in range(len(data['username'])):
        tx.run("MERGE(u:User"
        +"{name:"+str('\"')+str(data['username'][i])+str('\"')+"})")
    print(len(data['username']),len(data['watchlistnames']))
#
def create_movie_node(tx):
    data=pd.read_csv('test_data.csv')
    data.fillna(value ='Movie_X',inplace = True)
    for i in range(len(data['title'])):
        tx.run("MERGE(m:Movie"
        +"{name:"+str('\"')+str(data['title'][i])+str('\"')+"})")
    print(len(data['title']))
#
def create_watchlist_node(tx):
    data=pd.read_csv('test_data.csv')
    #data[''].fillna(value ='Wl_X',inplace = True)
    for i in range(len(data['watchlistnames'])):
        #print(str('\"')+str(df_wl['watchlistnames'][i])+str('\"'))
        tx.run("MERGE(w:Watchlist"
        +"{name:"+str('\"')+str(data['watchlistnames'][i])+str('\"')
        +","
        +"tracks:"+str(data['tracks'][i])+"})"
        )
    print(len(data['watchlistnames']))
#

#Relationships
def user_follows_user(tx):
    data=pd.read_csv('test_data.csv')
    data.fillna(value ='usrX',inplace = True)
    for i in range(len(data['username'])):
        rand_integer1 = random.randint(1,213) #generate a random number 
        rand_integer2 = random.randint(1,213)
        if(rand_integer1==rand_integer2):
            continue       
        tx.run("MATCH (u1:User{name:"+str('\"')+str(data['username'][rand_integer1])+str('\"')+"})"
            + "MATCH(u2:User{name:"+str('\"')+str(data['username'][rand_integer2])+str('\"')+"})"
            +  "with * "
            +"WHERE NOT (u1)-[:FOLLOW]-(u2)"
            +"MERGE(u1)-[:FOLLOW]->(u2)")    
#
def user_create_watchlist(tx):
    data=pd.read_csv('test_data.csv')
    data.fillna(value ='usr_x',inplace = True)    #
    #df_wl = df_wl['watchlistnames'].sample(frac=0.60) #take randomly 50% of the reviewers 
    for i in range(len(data['watchlistnames'])):       
        tx.run("MATCH (u:User{name:"+str('\"')+str(data['username'][i])+str('\"')+"})"
        + "MATCH(w:Watchlist{name:"+str('\"')+str(data['watchlistnames'][i])+str('\"')+"})"
        +"with * "
        + "WHERE "
        +"NOT (:User)-[:CREATE]-(w)"
        + "MERGE(u)-[r:"+str(data['status'][i])+"]->(w)"
        +"SET w.creator="+str('\"')+str(data['username'][i])+str('\"'))
    print(len(data['watchlistnames']))   
#
def user_follow_watchlist(tx):
    data=pd.read_csv('test_data.csv')
    data.fillna(value ='Wl_X',inplace = True)
    #df_wl = df_wl['watchlistnames'].sample(frac=0.60) #take randomly 50% of the reviewers 
    for i in range(1,len(data['username'])):  
        tx.run("MATCH (u:User{name:"+str('\"')+str(data['username'][i])+str('\"')+"})"
        + "MATCH(w:Watchlist{name:"+str('\"')+str(data['watchlistnames'][i-1])+str('\"')+"})"
        + "with * "
        +"WHERE NOT (u)-[:CREATE]->(w)"
        +"MERGE(u)-[:FOLLOW]->(w)"      
        )
#
def user_rates_movie(tx):  
    data=pd.read_csv('test_data.csv')
    data.fillna(value ='usrX',inplace = True)
    for i in range(len(data['username'])):       
        tx.run("MATCH (u:User)"
        + "WHERE u.name = '"+str(data['username'][i])+"'"
        +"Match(m:Movie) "
        + "WHERE m.name='"+str(data['title'][i])+"'"
        + "MERGE(u)-[:RATED{rating:"+str(data['rating'][i])+"}]->(m)")
#################################################################################
#
if __name__ == "__main__": 
  #print('Main')
    #in this python script we are goind to do 7 distinct tasks as listed in the presentation slide
    # 1) create neo4j nodes for users(u),watchlists(w) and movies(m)  then
    # 2) create neo4j relations (u)-[:FOLLOW]->(u), (u)-[:CREATE]->(w), (u)-[:FOLLOW]->(w) and (u)-[:RATED]->(m)
    #[create_user_node,create_watchlist_node,create_movie_node,user_follows_user,
    # user_create_watchlist,user_follow_watchlist,user_rates_movie]
    with conn.session() as session:
        session.write_transaction(create_user_node)
    with conn.session() as session:
        session.write_transaction(create_watchlist_node)
    with conn.session() as session:
        session.write_transaction(create_movie_node) 
    with conn.session() as session:
        session.write_transaction(user_follows_user)
    with conn.session() as session:
        session.write_transaction(user_create_watchlist)
    with conn.session() as session:
        session.write_transaction(user_follow_watchlist)
    with conn.session() as session:
        session.write_transaction(user_rates_movie)
    