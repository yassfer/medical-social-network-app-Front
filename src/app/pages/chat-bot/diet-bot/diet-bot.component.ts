import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/entities/Food';
import { Participant } from 'src/app/entities/Participant';
import listBreakfast from 'src/assets/data/listBreakfast.json';
import listLunch from 'src/assets/data/listLunch.json';
import listDiner from 'src/assets/data/listDinner.json';


@Component({
  selector: 'app-diet-bot',
  templateUrl: './diet-bot.component.html',
  styleUrls: ['./diet-bot.component.scss']
})
export class DietBotComponent implements OnInit {
  @Input()  currentName="rania";
  @Input()  myBmi:number;
  @Input()  myBmr:number;
  @Input()  myStatus:string;
  @Input()  myDailyCalories:number;
  @Input()  myCaloriesChange:number;
  @Input()  myBreakfast:string;
  @Input()  myLunch:string;
  @Input()  myDiner:string;

  constructor() { }

  participant: Participant=new Participant();
  submitted = false;
  filed = false;
  weightFail=false;
  rslt=false;
  breakfast = new Food();
  lunch = new Food();
  diner = new Food();

  myBreakfasts =[];
  myLunchs =[];
  myDiners =[];

  ngOnInit(): void {
    this.setGender('Male');

  }
  setRsl(etat){
    this.rslt=etat;
  }
  checkDiet() {

      this.checkEmptyFields();
      this.checkDifference(this.participant.weight,this.participant.weightGoal) ;
      if((this.filed)&&(this.submitted)  ) {
      this.myBmi=this.getBmi(this.participant.height,this.participant.weight);
        this.myBmr=this.getBmr(this.participant.gender,this.participant.height,this.participant.weight,
          this.participant.age);
        this.myStatus=this.getBmiStatus(this.myBmi);
        this.myDailyCalories=this.getDailyCalories(this.participant.activityLevel,this.myBmr);
        this.myCaloriesChange=this.getCaloriesChange(this.participant.weight,this.participant.weightGoal,
          this.participant.activityLevel,this.myBmr);
          this. getSuggstedMeal(this.myCaloriesChange);

        }

    //window.location.reload();
  }

  checkEmptyFields() {
    if(this.participant.age==null || this.participant.gender==null || this.participant.weight==null
      || this.participant.weightGoal==null || this.participant.activityLevel==null )
      {this.filed=false;
       }
    else
    this.filed=true;
  }

  checkDifference(weight,weightGoal)
  {
    if ((weight-weightGoal)>0.91 )
    {  this.weightFail=true;

      return false;
    }
    else  if (weight!=null && weightGoal!=null )
      {  this.weightFail=false;
        this.submitted=true;
        this.setRsl(true);
        return true;
    }

  }

  getBmi(height,weight){
    height=height/100;
    return Math.round(weight/(height*height));
  }

  getBmr (gender,height,weight,age) {
    if(gender=="Male")
    return Math.round((66+(13.5*weight)+(5*height)-(6.8*age)));
    else if (gender=="Female")
    return Math.round((655+(9.6*weight)+(1.8*height)-(4.7*age)));

  }

  getDailyCalories(activityLevel,bmr) {
    if (activityLevel==1)
    return bmr*1.2;
    else  if (activityLevel==2)
    return bmr*1.375;
    else  if (activityLevel==3)
    return bmr*1.55;
    else  if (activityLevel==4)
    return bmr*1.725;
    else  if (activityLevel==5)
    return bmr*1.9;
    else
    return 0;
  }

  getBmiStatus(bmi) {
    if (bmi<18.5)
    return "Under weight"
   else if (bmi>=18.5 && bmi<25)
   return "Normal";
   else if (bmi>=25 && bmi<30)
   return "over weight";
   else
   return "Obese";

  }

  getCaloriesChange(weight,weightGoal,activityLevel,bmr){
    let caloriesDiff;
    let dailyCalories;
    caloriesDiff=this.getWeightDiff(weight,weightGoal)*1000;
    dailyCalories =this.getDailyCalories(activityLevel,bmr);
    return caloriesDiff+dailyCalories;
  }
   getWeightDiff (weight,weightGoal)
   {
  return weightGoal-weight;
   }

   getSuggstedMeal(cal){
    let bCal=cal*25/100;
    let lCal=cal*45/100;
    let dCal=cal*30/100;
    let rand;
    //suggest breakfast
    this.searchBreakfast(bCal);
     rand=this.randomFood(this.myBreakfasts.length);
     console.log(rand);
    this.breakfast=this.myBreakfasts[rand];
    this.myBreakfast=this.breakfast.ammount +" of "+this.breakfast.contents +
    " which have "+this.breakfast.calories +"Kcal";
   //suggest lunch
   this.searchLunch(lCal);
     rand=this.randomFood(this.myLunchs.length);
   this.lunch=this.myLunchs[rand];
   this.myLunch=this.lunch.ammount +" of "+this.lunch.contents +
   " which have "+this.lunch.calories +"Kcal";
   //suggest diner
   this.searchdiner(dCal);
   rand=this.randomFood(this.myDiners.length);
   this.diner=this.myDiners[rand];
   this.myDiner=this.diner.ammount +" of "+this.diner.contents +
   " which have "+this.diner.calories +"Kcal";
  }

  searchBreakfast(cal) {
    listBreakfast.forEach(element => {
     if (element.calories<cal) {
       this.myBreakfasts.push(element);
      }
    });
  }

  searchLunch(cal) {
    listLunch.forEach(element => {
     if (element.calories<cal) {
       this.myLunchs.push(element);
      }
    });
    console.log(this.myLunchs)

  }
  searchdiner(cal) {
    listDiner.forEach(element => {
     if (element.calories<cal) {
       this.myDiners.push(element);

      }
    });
    console.log(this.myDiners)

  }

  randomFood(x) {
    return Math.floor(Math.random() * x);
  }
   setGender(gender : string){
     this.participant.gender = gender;
   }


}
