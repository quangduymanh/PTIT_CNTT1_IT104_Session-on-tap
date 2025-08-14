class Passenger {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Flight {
    constructor(code, destination, price, seats) {
        this.code = code;
        this.destination = destination;
        this.price = price;
        this.seats = seats;
    }
}

class DomesticFlight extends Flight {
    constructor(code, destination, price, seats) {
        super(code, destination, price, seats);
    }
}

class InternationalFlight extends Flight {
    constructor(code, destination, price, seats, passportRequired) {
        super(code, destination, price, seats);
        this.passportRequired = passportRequired;
    }
}

class Booking {
    constructor(passenger, flight) {
        this.passenger = passenger;
        this.flight = flight;
    }
}

class GenericRepository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
    remove(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }
}

class AirlineManager {
    constructor() {
        this.passengers = new GenericRepository();
        this.flights = new GenericRepository();
        this.bookings = new GenericRepository();
    }

    addPassenger() {
        const id = prompt("Nhập mã hành khách:");
        const name = prompt("Nhập tên hành khách:");
        this.passengers.add(new Passenger(id, name));
        console.log("Đã thêm hành khách!");
    }

    addDomesticFlight() {
        const code = prompt("Mã chuyến bay:");
        const destination = prompt("Điểm đến:");
        const price = parseFloat(prompt("Giá vé:"));
        const seats = parseInt(prompt("Số ghế:"));
        this.flights.add(new DomesticFlight(code, destination, price, seats));
        console.log("Đã thêm chuyến bay nội địa!");
    }

    addInternationalFlight() {
        const code = prompt("Mã chuyến bay:");
        const destination = prompt("Điểm đến:");
        const price = parseFloat(prompt("Giá vé:"));
        const seats = parseInt(prompt("Số ghế:"));
        const passportRequired = prompt("Yêu cầu hộ chiếu? (y/n)") === 'y';
        this.flights.add(new InternationalFlight(code, destination, price, seats, passportRequired));
        console.log("Đã thêm chuyến bay quốc tế!");
    }

    createBooking() {
        const passengerId = prompt("Nhập mã hành khách:");
        const flightCode = prompt("Nhập mã chuyến bay:");
        const passenger = this.passengers.getAll().find(p => p.id === passengerId);
        const flight = this.flights.getAll().find(f => f.code === flightCode);

        if (passenger && flight && flight.seats > 0) {
            this.bookings.add(new Booking(passenger, flight));
            flight.seats--;
            console.log("Đặt vé thành công!");
        } else {
            console.log("Không thể đặt vé!");
        }
    }

    cancelBooking() {
        const passengerId = prompt("Nhập mã hành khách hủy vé:");
        const flightCode = prompt("Nhập mã chuyến bay:");
        const index = this.bookings.getAll().findIndex(b => b.passenger.id === passengerId && b.flight.code === flightCode);

        if (index >= 0) {
            this.bookings.getAll()[index].flight.seats++;
            this.bookings.remove(index);
            console.log("Hủy vé thành công!");
        } else {
            console.log("Không tìm thấy vé để hủy!");
        }
    }

    showAvailableFlights() {
        console.log("Các chuyến bay còn ghế:");
        this.flights.getAll().forEach(f => {
            if (f.seats > 0) {
                console.log(`${f.code} - ${f.destination} - ${f.seats} ghế`);
            }
        });
    }

    showPassengerBookings() {
        const passengerId = prompt("Nhập mã hành khách:");
        const bookings = this.bookings.getAll().filter(b => b.passenger.id === passengerId);
        if (bookings.length === 0) {
            console.log("Không có vé!");
        } else {
            bookings.forEach(b => console.log(`Chuyến bay: ${b.flight.code} - ${b.flight.destination}`));
        }
    }

    calculateRevenue() {
        const total = this.bookings.getAll().reduce((sum, b) => sum + b.flight.price, 0);
        console.log("Tổng doanh thu:", total);
    }

    updateSeats() {
        const code = prompt("Nhập mã chuyến bay:");
        const seats = parseInt(prompt("Số ghế mới:"));
        const flight = this.flights.getAll().find(f => f.code === code);
        if (flight) {
            flight.seats = seats;
            console.log("Cập nhật thành công!");
        } else {
            console.log("Không tìm thấy chuyến bay!");
        }
    }
}

function main() {
    const airline = new AirlineManager();
    let choice;
    do {
        choice = prompt(`
===== MENU =====
1. Thêm hành khách
2. Thêm chuyến bay nội địa
3. Thêm chuyến bay quốc tế
4. Tạo vé
5. Hủy vé
6. Hiển thị chuyến bay còn ghế
7. Hiển thị vé của hành khách
8. Tính doanh thu
9. Cập nhật số ghế
10. Thoát
Chọn: `);

        switch (choice) {
            case '1': airline.addPassenger(); break;
            case '2': airline.addDomesticFlight(); break;
            case '3': airline.addInternationalFlight(); break;
            case '4': airline.createBooking(); break;
            case '5': airline.cancelBooking(); break;
            case '6': airline.showAvailableFlights(); break;
            case '7': airline.showPassengerBookings(); break;
            case '8': airline.calculateRevenue(); break;
            case '9': airline.updateSeats(); break;
            case '10': console.log("Thoát..."); break;
            default: console.log("Lựa chọn không hợp lệ!");
        }
    } while (choice !== '10');
}

main();
