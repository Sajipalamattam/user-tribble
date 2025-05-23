import json
import random
from datetime import datetime, date, timedelta

# Sample data pools
first_names = ["John", "Jane", "Alex", "Emily", "Michael", "Sarah", "David", "Laura", "Robert", "Linda"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
positions = [
    "Software Engineer", "Product Manager", "Designer", "Data Analyst", "HR Specialist",
    "Marketing Manager", "Sales Executive", "Customer Support", "Finance Manager", "Operations Manager"
]
locations = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
]
genders = ["Male", "Female", "Other"]
nationalities = [
    "American", "Canadian", "British", "Australian", "Indian",
    "German", "French", "Chinese", "Brazilian", "Mexican"
]

def random_dob(start_year=1958, end_year=2005):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    dob = start_date + timedelta(days=random_days)
    return dob.date()

def random_email(first_name, last_name):
    domains = ["example.com", "mail.com", "company.com"]
    return f"{first_name.lower()}.{last_name.lower()}@{random.choice(domains)}"

def random_phone():
    return f"+1-{random.randint(200,999)}-{random.randint(200,999)}-{random.randint(1000,9999)}"

def calculate_age(birthdate):
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

employees = []
for _ in range(50):
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    dob = random_dob()
    employee = {
        "Full name": f"{first_name} {last_name}",
        "Employee position": random.choice(positions),
        "Email": random_email(first_name, last_name),
        "Phone number": random_phone(),
        "Date of Birth": dob.strftime('%Y-%m-%d'),
        "Age": calculate_age(dob),
        "Location": random.choice(locations),
        "Gender": random.choice(genders),
        "Nationality": random.choice(nationalities)
    }
    employees.append(employee)

# Save to a JSON file
with open('employees.json', 'w') as f:
    json.dump(employees, f, indent=4)
