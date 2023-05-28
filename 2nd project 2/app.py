from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database configuration
db_config = {
    'host': '127.0.0.1',
    'user': 'myuser',
    'password': 'password',
    'database': 'mydb',
}


# CREATE TABLE business (id INT AUTO_INCREMENT PRIMARY KEY, business_name VARCHAR(255), password VARCHAR(255))
# CREATE TABLE business ( id INT AUTO_INCREMENT PRIMARY KEY, business_name VARCHAR(255), password VARCHAR(255));
# CREATE TABLE details (
#   id INT AUTO_INCREMENT PRIMARY KEY,
#   date DATE,
#   description VARCHAR(255),
#   debit DECIMAL(10, 2),
#   credit DECIMAL(10, 2),
#   total DECIMAL(10, 2),
#   remarks VARCHAR(255),
#   userId INT,
#   businessId INT,
#   FOREIGN KEY (userId) REFERENCES users(id),
#   FOREIGN KEY (businessId) REFERENCES business(id)
# );


# Create a connection to the MySQL database
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Route to render the admin dashboard HTML page
@app.route('/admindashboard')
def admin_dashboard():
    return render_template('admindashboard.html')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Route to fetch data from the database
@app.route('/data', methods=['GET'])
def get_data():
    # conn = mysql.connector.connect(**db_config)

    # Retrieve data from the database
    cursor = conn.cursor()
    query = "SELECT * FROM business"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()

    # Convert data to JSON format
    json_data = []
    for row in data:
        json_data.append({
            'id': row[0],
            'business_name': row[1],
            'password': row[2]
            # Add more fields as needed
        })

    # Return JSON response
    return jsonify(json_data)


@app.route('/removeBusiness/<int:x>', methods=['DELETE'])
def removeBusiness(x):
    cursor = conn.cursor()
    query = "DELETE FROM business WHERE id = %s;"
    query2 = "DELETE FROM details WHERE businessId = %s;"
    cursor.execute(query,(x,))
    cursor.execute(query2,(x,))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Data Deleted successfully'})

@app.route('/removeInvoice/<int:x>', methods=['DELETE'])
def removeInvoice(x):
    cursor = conn.cursor()
    query = "DELETE FROM details WHERE id = %s;"
    cursor.execute(query,(x,))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Data Deleted successfully'})



@app.route('/get-details/<int:rowId>', methods=['GET'])
def fetch_details(rowId):
# conn = mysql.connector.connect(**db_config)

    # Retrieve data from the database
    cursor = conn.cursor()
    query = "SELECT * FROM `details` WHERE businessId = %s"
    cursor.execute(query,(rowId,))
    data = cursor.fetchall()
    cursor.close()

    # Convert data to JSON format
    json_data = []
    for row in data:
        json_data.append({
            'id': row[0],
            'date': row[1],
            'description': row[2],
            'debit': row[3],
            'credit': row[4],
            'total': row[5],
            'remarks': row[6]
            # Add more fields as needed
        })


    return jsonify(json_data)


# Route to handle form submission and save data to the 'details' table
@app.route('/save-details', methods=['POST'])
def save_details():
    data = request.get_json()  # Get the JSON payload from the request
    
    # Extract the data fields from the JSON payload
    date = data['date']
    description = data['description']
    debit = data['debit']
    credit = data['credit']
    total = data['total']
    remarks = data['remarks']
    userId = data['userId']
    businessId = data['rowId']

    # SQL query to insert data into the 'details' table
    query = "INSERT INTO details (date, description, debit, credit, total, remarks, userId, businessId) VALUES (%s, %s, %s, %s, %s, %s,%s, %s)"
    
    # Execute the SQL query
    cursor.execute(query, (date, description, debit, credit, total, remarks, userId, businessId))
    
    # Commit the changes to the database
    conn.commit()

    return jsonify({'message': 'Data saved successfully'})

@app.route('/add-business', methods=['POST'])
def add_business():
    data = request.get_json()  # Get the JSON payload from the request
    business_name = data['business_name']
    password = data['password']

    query = "INSERT INTO business (business_name, password) VALUES (%s, %s)"

    cursor.execute(query,(business_name, password))

    conn.commit()

    return jsonify({'message': 'Data saved successfully'})




@app.route('/login', methods=['GET'])
def login():
    cursor = conn.cursor()
    query = "SELECT * FROM users"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()

    # Convert data to JSON format
    json_data = []
    for row in data:
        json_data.append({
            'username': row[1],
            'password': row[2]
            # Add more fields as needed
        })

    # Return JSON response
    return jsonify(json_data)







# Route to update the business name
@app.route('/update-business/<int:businessId>', methods=['PUT'])
def update_business(businessId):
    data = request.get_json()
    businessName = data['businessName']
    businessPass = data['businessPass']

    # Update the business name in the database
    cursor = conn.cursor()
    query = "UPDATE business SET business_name = %s, password = %s WHERE id = %s"  # Modify the condition as needed
    cursor.execute(query, (businessName,businessPass,businessId))
    conn.commit()
    cursor.close()
    
    return jsonify({'message': 'Business name updated successfully'})

@app.route('/updateInvoice/<int:businessid>', methods=['PUT'])
def updateInvoice(businessid):
    data = request.get_json()
    date = data['date']
    description = data['description']
    total = data['total']
    debit = data['debit']
    credit = data['credit']
    remarks = data['remarks']
    # date = data['date']

    cursor = conn.cursor()
    query = "UPDATE details SET date = %s, description = %s, total = %s, debit = %s, credit = %s, remarks = %s WHERE id = %s"
    cursor.execute(query,(date,description,total,debit,credit,remarks, businessid))
    conn.commit()

    return jsonify({'message' : 'Invoice Updated successfully'})


if __name__ == '__main__':
    app.run(debug=True)