$(function() {
    var democrats = 0,
    republicans = 0,
    independents = 0,
    representatives,
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
  
    var requestUrl = "https://api.propublica.org/congress/v1/113/house/members.json"
    var requestHeader = {
      "headers" :{
        'X-API-Key':"Xo94t9qApLV5hDBVt7L9EsQrFSrrcJuTIos0wI6U"
      }
    }
    fetch(requestUrl, requestHeader)
    .then(res => res.json())
    .then(data => {
      representatives = data.results[0].members;
      app.representatives = representatives;
      quantityPerParty(representatives)
      app.parties.republicans.members = republicans;
      app.parties.democrats.members = democrats;
      app.parties.independents.members = independents;
      console.log(app.parties.independents)
      percentages(representatives)
      app.parties.republicans.percentage = percentageRepublicans;
      app.parties.democrats.percentage = percentageDemocrats;
      app.parties.independents.percentage = percentageIndependents;
      WithMoreLoyalty(representatives)
      tenMoreLoyalty(moreLoyalty)
      app.tenMoreLoyalty = tenWithMoreLoyalty;
      WithLessLoyalty(representatives)
      tenLessLoyalty(lessLoyalty)
      app.tenLessLoyalty = tenWithLessLoyalty;
      WithMoreAttendance(representatives)
      tenMoreAttendance(moreAttendance)
      app.tenMoreAttendance = tenWithMoreAttendance;
      WithLessAttendance(representatives)
      tenLessAttendance(lessAttendance)
      app.tenLessAttendance = tenWithLessAttendance;
    })
    .catch(err => {
      console.log("error", err);
    })
    /*Empezamos con la funcion para obtener cantidad de senadores*/ 
    function quantityPerParty(representatives) {
      representatives.forEach(members => {
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
    /*Funcion para obtener el porcentaje de representantes*/
    function percentages(representatives){
      percentageDemocrats = democrats*100/356;
      percentageRepublicans = republicans*100/356;
      percentageIndependents = independents*100/356;
      return percentageRepublicans, percentageDemocrats, percentageIndependents
    }
    /*Funciones para obtener los representantes mas leales*/ 
    function WithMoreLoyalty(representatives){
      moreLoyalty = representatives.sort((a,b) =>(
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
    /*funciones para obtener los representantes menos leales*/ 
    function WithLessLoyalty(representatives){
      lessLoyalty = representatives.sort((a,b) =>(
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
    /*funciones para obtener los representantes con mayor asistencia*/
    function WithMoreAttendance(representatives) {
      moreAttendance = representatives.sort((a,b)=>(
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
    /*Funciones para obtener los representantes con menos asistencia*/
    function WithLessAttendance(representatives) {
      lessAttendance = representatives.sort((a,b)=>(
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
      representatives:[],
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
  