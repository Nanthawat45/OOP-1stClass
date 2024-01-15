// Customer
class Customer {
    orders = [];
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    addOrder(order) {
        this.orders.push(order);
    }
  }
  
  // Order
  class Order {
    payment = null;
    orderDetails = [];
    constructor(data, status) {
        this.data = data;
        this.status = status;
    }
    printDetail(){
        for(let i = 0 ; i< this.orderDetails.length; i++){
            console.log(
                "ลำดับที่ : " + (i + 1) + this.orderDetails[i].getDetail()
            );
        }
        console.log("รวมทั้งหมด " + this.calcTotal() + " บาท")
        this.payment.printDetail();
    }
  

    
    calcSubTotal() {
       //return this.orderDetails.reduce((total, orderDetail)=> total + orderDetail.subTotal(),0);
       let subTotal = 0;
       for (let i = 0; i <this.orderDetails.length; i++){
        subTotal += this.orderDetails[i].calcSubTotal();
       }
       return subTotal;
    }
    calcTax() {
        let Tax = 0;
       for (let i = 0; i <this.orderDetails.length; i++){
        Tax += this.orderDetails[i].calcTax();
       }
       return Tax;
    }
    calcTotal() {
        return this.calcSubTotal() + this.calcTax();
    }
    calcTotalWeight() {
        let TotalWeight = 0;
       for (let i = 0; i <this.orderDetails.length; i++){
        weight+= this.orderDetails[i].calcTotalWeight();
       }
       return TotalWeight;
    }
    addPayment(payment) {
        this.payment = payment;
    }
    addOrderDetail(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
  }
  
  // OrderDetail
  class OrderDetail {
    item = null;
    constructor(quantity, textStatus) {
        this.quantity = quantity;
        this.textStatus = textStatus;
    }
    calcSubTotal() {
        return this.item.getPriceForQuantity(this.quantity) + this.calcTax();
    }
    calcTax() {
        return this.item.getTax(this.textStatus);
    }
    calcTotalWeight() {
        return this.shoppingWeight;
    }
    
    addItem(item) {
        this.item = item;
    }

    getDetail(){
        return (
            this.item.description +
             " จำนวน : " + 
             this.quantity + 
            " รายการ "+
            " ราคา "+
            this.calcSubTotal() +
            " บาท"
        );
    }
  }
  
  // Item
  class Item {
    constructor(shoppingWeight, description, price) {
        this.shoppingWeight = shoppingWeight;
        this.description = description;
        this.price = price;
    }
    setInStock(status){
        this.inStock = status;
    }
    getPriceForQuantity(quantity) {
        return this.price * quantity;
    }
    getTax(taxStatus) {
        if(taxStatus === "Tax included"){
            return 0 ;
        }
        else{
            return this.price * 0.07;
        }
    }
    inStock() {
        console.log("inStock");
    }
  }
  
  // Payment
  class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    printDetail(){
        console.log("ชำระด้วย...");
    }
  }
  
  // Cash
  class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    printDetail(){
        console.log("ชำระด้วยเงินสด จำนวน " + this.amount + "บาท" );
    }
  }
  
  // Check
  class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    authorized() {
        console.log("authorized");
    }
    printDetail(){
        console.log("ชำระด้วยเช็ค จำนวน " + this.amount + "บาท" );
    }
  }
  
  // Credit
  class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    printDetail(){
        console.log("ชำระด้วยบัตรเครดิต จำนวน " + this.amount + "บาท" );
    }
  }
  
  const main = () => {
    let customer1 = new Customer("Nanthawat", "NPRU");
    let customer2 = new Customer("Tin", "NPRU");
    //console.log(customer1);
  
    // Product items
    const item1 = new Item(0.3, " ออลอินวันบักเก็ต", 299);
    const item2 = new Item(0.1, " ป๊อปบอมแซ่บ", 39);
    const item3 = new Item(0.2, " เดอะบอกซ์ สตสร์", 159);
    const item4 = new Item(0.2, " ชิดแอนแช์ ทีมนักเก็ตป๊อป", 99);
    const item5 = new Item(0.4, " ข้าวไก่กรอบแกงเขียวหวาน", 89);
  
    // Create order
    const order1 = new Order("08/01/2567", "In process");
    const order2 = new Order("09/01/2567", "In process");
    const order3 = new Order("10/01/2567", "In process");
    
    // Add order to a customer
    customer1.addOrder(order1);
    customer1.addOrder(order2);
    customer2.addOrder(order3);
  
    // Create order details
    const orderDetail1 = new OrderDetail(5, "Tax included");
    orderDetail1.addItem(item1);
    const orderDetail2 = new OrderDetail(2, "Tax included");
    orderDetail2.addItem(item5);
    const orderDetail3 = new OrderDetail(5, "Tax included");
    orderDetail3.addItem(item1);
    const orderDetail4 = new OrderDetail(3, "Tax included");
    orderDetail4.addItem(item1);
    const orderDetail5 = new OrderDetail(2, "Tax included");
    orderDetail5.addItem(item1);
    const orderDetail6 = new OrderDetail(1, "Tax included");
    orderDetail6.addItem(item1);
    
    // Add order details to the order
    order1.addOrderDetail(orderDetail1);
    order1.addOrderDetail(orderDetail2);

    order2.addOrderDetail(orderDetail3);
    order2.addOrderDetail(orderDetail4);

    order3.addOrderDetail(orderDetail5);
    order3.addOrderDetail(orderDetail6);

    //Payment
    const cash = new Cash(order1.calcTotal(),"");
    customer1.orders[0].addPayment(cash);

    const credit = new Credit(
        order2.calcTotal(),
        "123456789987654321", 
        "credit", 
        "30/25"
        );
    customer1.orders[1].addPayment(credit);

    
    
    // Console.log
    console.log(customer1.orders);
  
    // Output example
    // Name: Nanthawat
    // Number of orders: 1
    // Order number: 1
    // 1. ออลอินวันบักเก็ต - Quantity: 5 - Price: 1495
    // 2. ข้าวไก่กรอบแกงเขียวหวาน - Quantity: 2 - Price: 178
    // Total: 1673
  
    console.log("ชื่อ : " + customer1.name);
    
    console.log("จำนวนคำสั่งซื้อ : "+ customer1.orders.length);
  
    // for (let i = 0; i < customer1.orders.length; i++){
    //     console.log("คำสั่งซื้อ :" + ( i + 1));
    //     let total = 0;
    //     //console.log(customer1.orders[i].orderDetail);
    //     for (let k = 0 ; k < customer1.orders[i].orderDetails.length; k++){
    //         const item = customer1.orders[i].orderDetails[k].item;
    //         const quantity = customer1.orders[i].orderDetails[k].quantity;
    //         const SubTotal = quantity * item.price;
    //         console.log(
    //             "ลำดับที่ " +
    //             (k + 1) +
    //             " " + 
    //             item.description +
    //             " จำนวน " +
    //             quantity + 
    //             " รายการ "+
    //             " ราคา "+
    //             SubTotal +
    //             " บาท"
    //         );
    //     }
    //     console.log("รวมทั้งหมด " + total + " บาท");
    // }

    //Display
    console.log("ชื่อ : "+ customer1.name);
    console.log("จำนวนคำสั้งซื้อ : "+ customer1.orders.length);
    for (let i = 0; i < customer1.orders.length; i++) {
        console.log("คำสั้งซื้อที่ : "+ ( i + 1 ));
        customer1.orders[i].printDetail();
    }
  };
  main();
  