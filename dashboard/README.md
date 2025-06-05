# BullyStop Dashboard

This repository contains a self-hostable dashboard implementation using Metabase and Docker for the BullyStop project.

## Prerequisites

- Docker
- Docker Compose
- Access to the Railway PostgreSQL database
- curl (for health checks)

## Quick Start

1. Clone this repository:
```bash
git clone <repository-url>
cd dashboard
```

2. Run the setup script:
```bash
./setup.sh
```

The setup script will:
- Create necessary directories
- Clean up any existing containers
- Start the services with proper health checks
- Verify the services are running

3. Access Metabase at http://localhost:3000

## Service Health Checks

The setup includes health checks for both services:
- PostgreSQL: Checks if the database is ready to accept connections
- Metabase: Verifies the API is responding

You can check the health status with:
```bash
docker-compose ps
```

## Troubleshooting

### Common Issues

1. **Container Already Exists**
   - The setup script will automatically clean up existing containers
   - If you still encounter issues, run:
     ```bash
     docker-compose down
     ./setup.sh
     ```

2. **Database Connection Issues**
   - Verify your `.env` file has the correct credentials
   - Check if the database is accessible:
     ```bash
     docker-compose exec postgres psql -U postgres -d railway
     ```

3. **Metabase Not Starting**
   - Check the logs:
     ```bash
     docker-compose logs metabase
     ```
   - Ensure the database is healthy:
     ```bash
     docker-compose ps
     ```

4. **Health Check Failures**
   - If health checks fail, the services will automatically restart
   - Check the logs for specific error messages
   - Verify network connectivity and port availability

### Advanced Troubleshooting

1. **Reset Everything**
   ```bash
   docker-compose down -v
   rm -rf metabase-data/*
   ./setup.sh
   ```

2. **Check Service Logs**
   ```bash
   # All services
   docker-compose logs
   
   # Specific service
   docker-compose logs metabase
   docker-compose logs postgres
   ```

3. **Verify Database Connection**
   ```bash
   docker-compose exec postgres psql -U postgres -d railway -c "\dt"
   ```

## Dashboard Configuration

After accessing Metabase, follow these steps to set up the dashboard:

1. Create an admin account when prompted
2. Connect to the PostgreSQL database using these credentials:
   - Host: gondola.proxy.rlwy.net
   - Port: 14657
   - Database: railway
   - Username: postgres
   - Password: (from your .env file)

3. Configure the data model:
   - Go to Admin > Data Model
   - Set the type of `latitude` and `longitude` columns to "Latitude" and "Longitude" respectively
   - Verify other column types are correctly set

4. Create the dashboard:
   - Create a new dashboard named "BullyStop - Panel General"
   - Add the following visualizations:

### 🗺️ Geolocation Section
- **Map of Alerts**: Pin map showing alert locations
  - Use the "Map of alerts by location" query
  - Visualization: Map > Pin map
  - Set latitude and longitude fields

- **Conflict Zones**: Heatmap of alert frequency
  - Use the "Heatmap of conflict zones" query
  - Visualization: Map > Grid map
  - Set rounded latitude and longitude fields

### 🧍 Users Section
- **Active Users**: Large number display
  - Use the "Total active users" query
  - Visualization: Number

- **Weekly Registrations**: Line chart
  - Use the "New registrations per week" query
  - Visualization: Line chart
  - X-axis: week, Y-axis: new_users

- **Grade Distribution**: Bar chart
  - Use the "Distribution by school grade" query
  - Visualization: Bar chart
  - X-axis: grade, Y-axis: user_count

### 🚨 Alerts Section
- **Daily Alerts**: Line chart
  - Use the "Number of alerts per day/week" query
  - Visualization: Line chart
  - X-axis: date, Y-axis: alert_count

- **Top Alerting Users**: Table
  - Use the "Top 10 users with most alerts" query
  - Visualization: Table
  - Sort by alert_count descending

- **Hourly Alert Pattern**: Bar chart
  - Use the "Alerts by hour of day" query
  - Visualization: Bar chart
  - X-axis: hour, Y-axis: alert_count

### 📋 Surveys Section
- **Total Responses**: Large number display
  - Use the "Total responses received" query
  - Visualization: Number

- **Completion Rate**: Progress bars
  - Use the "Survey completion rate" query
  - Visualization: Progress bars
  - Show completion_percentage

- **Participation Average**: Bar chart
  - Use the "Average participation per survey" query
  - Visualization: Bar chart
  - X-axis: title, Y-axis: average_score

### 📈 Trends Section
- **Response Trends**: Line chart
  - Use the "Response trends over time" query
  - Visualization: Line chart
  - X-axis: month, Y-axis: average_score
  - Group by: title

- **Grade Comparison**: Bar chart
  - Use the "Comparative analysis between grades" query
  - Visualization: Bar chart
  - X-axis: grade, Y-axis: average_score
  - Group by: title

## Data Persistence

- Metabase data is stored in the `./metabase-data` directory
- PostgreSQL data is stored in a Docker volume named `bullystop-postgres-data`

## Maintenance

To stop the services:
```bash
docker-compose down
```

To update Metabase:
```bash
docker-compose pull metabase
docker-compose up -d
```

## Security Notes

- Never commit your `.env` file to version control
- Keep your `MB_ENCRYPTION_SECRET_KEY` secure and consistent across deployments
- Regularly update your Docker images for security patches
- The setup uses health checks to ensure services are running properly

## Support

For any issues or questions, please contact the development team. 