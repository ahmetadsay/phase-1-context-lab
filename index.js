const createEmployeeRecord = function (employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  const createEmployeeRecords = function (employeesData) {
    return employeesData.map((employeeData) => createEmployeeRecord(employeeData));
  };
  
  const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10),
    });
    return this;
  };
  
  const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10),
    });
    return this;
  };
  
  const hoursWorkedOnDate = function (date) {
    const timeIn = this.timeInEvents.find((event) => event.date === date).hour;
    const timeOut = this.timeOutEvents.find((event) => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  };
  
  const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  };
  
  const allWagesFor = function () {
    const dates = this.timeInEvents.map((event) => event.date);
    const totalWages = dates.reduce(
      (total, date) => total + wagesEarnedOnDate.call(this, date),
      0
    );
    return totalWages;
  };
  
  const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  };
  
  const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce(
      (total, employee) => total + allWagesFor.call(employee),
      0
    );
  };
  
