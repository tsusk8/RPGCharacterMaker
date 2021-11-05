const url = {
    maleMage: "https://recursionist.io/img/dashboard/lessons/quickstart/male-mage.png",
    femaleMage: "https://recursionist.io/img/dashboard/lessons/quickstart/female-mage.png",
    maleWarrior: "https://recursionist.io/img/dashboard/lessons/quickstart/male-warrior.png",
    femaleWarrior: "https://recursionist.io/img/dashboard/lessons/quickstart/female-warrior.png",
    maleHero: "https://recursionist.io/img/dashboard/lessons/quickstart/male-hero.png",
    femaleHero: "https://recursionist.io/img/dashboard/lessons/quickstart/female-hero.png"
}
new Vue({
    el: "#app",
    data: {
        viewName: "Unknown",
        viewGender: "Male",
        viewClass: "Hero",
        viewTraits: "Everyman",
        viewUrl: url.maleHero,
        viewStrength : 10,
        viewAgility : 10,
        viewResilience : 10,
        viewWisdom : 10,
        viewLuck : 15,
        inputedGender: "option1",
        inputedClass: "1",
        inputedTraits: "1",
        traits : [
            {id: 1, name: "Everyman"},
            {id: 2, name: "Bat out of hell"},
            {id: 3, name: "Brave"},
            {id: 3, name: "Lucky devil"},
        ],
    },
    watch: {
        inputedGender: function(){
            this.computedGender();
            this.fetchTraits();
            this.computedURL();
        },
        inputedClass: function(){
            this.computedClass();
            this.fetchTraits();
            this.computedURL();
        },
        inputedTraits: function(){
            this.computedTraits();
            this.computedAbility();
        },
    },
    methods: {
        computedGender: function(){
            this.viewGender = document.getElementsByName("inlineRadioOptions")[0].checked === true ? "Male" : "Female";
        },
        computedClass: function(){
            this.viewClass = this.inputedClass === "1" ? "Hero" : this.inputedClass === "2" ? "Warrior" : "Mage";
        },
        computedTraits: function(){
            console.log(this.inputedTraits);
            if(this.inputedTraits === 3){
                if(this.viewClass === "Hero"){
                    this.viewTraits = "Brave";
                }else{
                    this.viewTraits = this.viewGender === "Male" ? "Lucky devil" : "Tomboy";
                }
            }else{
                this.viewTraits = this.inputedTraits === "1" ? "Everyman" : "Bat out of hell";
            }
            
        },
        computedURL: function(){
            let tmpUrl = "";
            switch(this.viewGender){
                case "Male":
                    switch(this.viewClass){
                        case "Hero":
                            tmpUrl = url.maleHero;
                            break;
                        case "Warrior":
                            tmpUrl = url.maleWarrior;
                            break;
                        case "Mage":
                            tmpUrl = url.maleMage;
                            break;
                    }
                    break;
                case "Female":
                    switch(this.viewClass){
                        case "Hero":
                            tmpUrl = url.femaleHero;
                            break;
                        case "Warrior":
                            tmpUrl = url.femaleWarrior;
                            break;
                        case "Mage":
                            tmpUrl = url.femaleMage;
                            break;
                    }
                    break;
            }
            this.viewUrl = tmpUrl;
        },
        computedAbility: function(){
            this.viewStrength = 10;
            this.viewAgility = 10;
            this.viewResilience = 10;
            this.viewWisdom = 10;
            this.viewLuck = 15;

            switch(this.viewTraits){
                case "Bat out of hell":
                    this.viewAgility = 10 * 1.4;
                    break;
                case "Brave":
                    this.viewStrength = 10 * 1.1;
                    this.viewAgility = 10 * 1.1;
                    this.viewLuck = 15 * 1.2;
                    break;
                case "Lucky devil":
                    this.viewLuck = 15 * 1.5;
                    break;
                case "Tomboy":
                    this.viewStrength = 10 * 1.1;
                    this.viewAgility = 10 * 1.1;
                    break;
            }
        },
        fetchTraits: function(){
            let tmpTraits = [
                {name: "Everyman", value: 1},
                {name: "Bat out of hell", value: 2}
            ];
            if (this.viewClass === "Hero") {
                tmpTraits.push({name: "Brave", value: 3});

                if(this.viewGender === "Male"){
                    tmpTraits.push({name: "Lucky devil", value: 3});
                } else {
                    tmpTraits.push({name: "Tomboy", value: 3});
                }
                
            } else if(this.viewGender === "Male"){
                tmpTraits.push({name: "Lucky devil", value: 3});
            } else {
                tmpTraits.push({name: "Tomboy", value: 3});
            }
            
            this.traits = tmpTraits;
        }
    },
})