class person {
	constructor(fname, lname) {
		this.firstName= fname;
		this.lastName= lname;
	}
	fullname(){
		return this.firstName+" "+this.lastName;
	}
}

const p1 = new person("John", "Doe");
console.log(p1.fullname());
console.log(p1.age());
