/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(empArray) {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(empsArray){
    return empsArray.map(function(emp) {
        return createEmployeeRecord(emp)
    })
}

let createTimeInEvent = function(datetime){
    const [date, time] = datetime.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date
    })
    return this
}

let createTimeOutEvent = function(datetime){
    const [date, time] = datetime.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date
    })
    return this
}

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(function(t){
        return t.date === date
    })

    let timeOut = this.timeOutEvents.find(function(t){
        return t.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(date){
    let hrs = hoursWorkedOnDate.call(this, date)
    return hrs * this.payPerHour
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(emp){
        emp.firstName === firstName
    })
}

let calculatePayroll = function(emps){
    return emps.reduce(function(all, emp){
        return all + allWagesFor.call(emp)
    })
}