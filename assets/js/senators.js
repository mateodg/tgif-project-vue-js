$(function() {
    var democrats = 0,
    republicans = 0,
    independents = 0,
    senators,
    percentageDemocrats = 0 
    percentageRepublicans = 0,
    percentageIndependents = 0,
    moreLoyalty = [],
    lessLoyalty = [],
    moreAttendance = [],
    lessAttendance = [],
    tenWithMoreLoyalty = [],
    tenWithLessLoyalty = [],
    tenWithMoreAttendance = [],
    tenWithLessAttendance = [];
  
    var requestUrl = "https://api.propublica.org/congress/v1/113/senate/members.json"
    var requestHeader = {
      "headers" :{
        'X-API-Key':'ufR11s6D45kHuQjr3e7XzheQeY9Fnk0c9qzWyiVQ'
      }
    }
    fetch(requestUrl, requestHeader)
    .then(res => res.json())
    .then(data => {
      senators = data.results[0].members;
      app.senators = senators;
      quantityPerParty(senators)
      app.parties.republicans.members = republicans;
      app.parties.democrats.members = democrats;
      app.parties.independents.members = independents;
      console.log(app.parties.independents)
      percentages(senators)
      app.parties.republicans.percentage = percentageRepublicans;
      app.parties.democrats.percentage = percentageDemocrats;
      app.parties.independents.percentage = percentageIndependents;
      WithMoreLoyalty(senators)
      tenMoreLoyalty(moreLoyalty)
      app.tenMoreLoyalty = tenWithMoreLoyalty;
      WithLessLoyalty(senators)
      tenLessLoyalty(lessLoyalty)
      app.tenLessLoyalty = tenWithLessLoyalty;
      WithMoreAttendance(senators)
      tenMoreAttendance(moreAttendance)
      app.tenMoreAttendance = tenWithMoreAttendance;
      WithLessAttendance(senators)
      tenLessAttendance(lessAttendance)
      app.tenLessAttendance = tenWithLessAttendance;
    })
    .catch(err => {
      console.log("error", err);
    })
    /*Empezamos con la funcion para obtener cantidad de senadores*/ 
    function quantityPerParty(senators) {
      senators.forEach(members => {
        switch (members.party) {
          case "D": democrats++; 
              break;
          case "R": republicans++;
              break;
          case "I": independents++;
              break; 
        }
        return democrats, republicans, independents
      });
      
    }
    /*Funcion para obtener el porcentaje de senadores*/
    function percentages(senators){
      percentageDemocrats = democrats*100/105;
      percentageRepublicans = republicans*100/105;
      percentageIndependents = independents*100/105;
      return percentageRepublicans, percentageDemocrats, percentageIndependents
    }
    /*Funciones para obtener los senadores mas leales*/ 
    function WithMoreLoyalty(senators){
      moreLoyalty = senators.sort((a,b) =>(
        a.votes_against_party_pct - b.votes_against_party_pct 
      ))
      return moreLoyalty
    }
    function tenMoreLoyalty(moreLoyalty) {
      for (let i = 0; i < 10; i++) {
        tenWithMoreLoyalty[i] = moreLoyalty[i]; 
      }
    }
    return tenWithMoreLoyalty
    /*funciones para obtener los senadores menos leales*/ 
    function WithLessLoyalty(senators){
      lessLoyalty = senators.sort((a,b) =>(
        b.votes_against_party_pct - a.votes_against_party_pct 
      ))
      return lessLoyalty
    }
    function tenLessLoyalty(lessLoyalty) {
      for (let i = 0; i < 10; i++) {
        tenWithLessLoyalty[i] = lessLoyalty[i]; 
      }
    }
    return tenWithLessLoyalty
    /*funciones para obtener los senadores con mayor asistencia*/
    function WithMoreAttendance(senators) {
      moreAttendance = senators.sort((a,b)=>(
          b.missed_votes_pct - a.missed_votes_pct
        ))
        return moreAttendance
    } 
    function tenMoreAttendance(moreAttendance) {
      for(let i=0 ; i < 10; i++){
        tenWithMoreAttendance[i] = moreAttendance[i]
      }
    }
    return tenWithMoreAttendance
    /*Funciones para obtener los senadores con menos asistencia*/
    function WithLessAttendance(senators) {
      lessAttendance = senators.sort((a,b)=>(
          a.missed_votes_pct - b.missed_votes_pct
        ))
        return lessAttendance
    } 
    function tenLessAttendance(lessAttendance) {
      for(let i=0 ; i < 10; i++){
        tenWithLessAttendance[i] = lessAttendance[i]
      }
    }
    return tenWithLessAttendance
  
  })
  var app = new Vue ({
    el : '#app',
    data:{
      senators:[],
      parties:{
        republicans:{
          name:"Republicans",
          members: 0,
          percentage: 0,
        },
        democrats : {
          name : "Democrats",
          members: 0,
          percentage: 0,
        },
        independents : {
          name : "Independents",
          members : 0,
          percentage : 0,
        },
      },
      tenMoreLoyalty:[],
      tenLessLoyalty:[],
      tenMoreAttendance:[],
      tenLessAttendance:[]
    }
  
  })
  