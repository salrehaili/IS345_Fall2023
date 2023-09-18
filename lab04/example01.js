const person = {
	firstName:"John",
	lastName:"Doe",
	age:50,
	eyeColor:"blue",
	fullname1: function(){
		return this.firstName+" "+this.lastName;
	}
};

console.log(person.firstName);
console.log(person['firstName']);
console.log(person.fullname1());
