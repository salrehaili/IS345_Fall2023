let text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe", "fullname":"()=>{return this.firstName+this.lastName;}" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';

const obj = JSON.parse(text);
const obj2=eval(text);
console.log(eval(obj2.employees[0].fullname));
console.log(obj);


// a=['a', 'b', 'c'];
// for(i=0;i<a.length;i++)
// 	console.log(a[i]);

// a.forEach((i)=>console.log(i));