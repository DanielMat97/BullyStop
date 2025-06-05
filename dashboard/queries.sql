-- Geolocation Queries
-- Map of alerts by location
SELECT 
    latitude,
    longitude,
    COUNT(*) as alert_count
FROM panic_alerts
GROUP BY latitude, longitude;

-- Heatmap of conflict zones
SELECT 
    ROUND(latitude, 2) as lat_rounded,
    ROUND(longitude, 2) as long_rounded,
    COUNT(*) as alert_count
FROM panic_alerts
GROUP BY lat_rounded, long_rounded;

-- User Statistics
-- Total active users
SELECT COUNT(*) as active_users
FROM users
WHERE active = true;

-- New registrations per week
SELECT 
    DATE_TRUNC('week', created_at) as week,
    COUNT(*) as new_users
FROM users
GROUP BY week
ORDER BY week;

-- Distribution by school grade
SELECT 
    grade,
    COUNT(*) as user_count
FROM users
GROUP BY grade
ORDER BY grade;

-- Alert Statistics
-- Number of alerts per day/week
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as alert_count
FROM panic_alerts
GROUP BY date
ORDER BY date;

-- Top 10 users with most alerts
SELECT 
    u.id,
    u.name,
    COUNT(*) as alert_count
FROM panic_alerts pa
JOIN users u ON pa.user_id = u.id
GROUP BY u.id, u.name
ORDER BY alert_count DESC
LIMIT 10;

-- Alerts by hour of day
SELECT 
    EXTRACT(HOUR FROM created_at) as hour,
    COUNT(*) as alert_count
FROM panic_alerts
GROUP BY hour
ORDER BY hour;

-- Survey Statistics
-- Total responses received
SELECT COUNT(*) as total_responses
FROM survey_response;

-- Survey completion rate
SELECT 
    s.id as survey_id,
    s.title,
    COUNT(sr.id) as responses_received,
    COUNT(DISTINCT u.id) as total_users,
    ROUND((COUNT(sr.id)::float / COUNT(DISTINCT u.id)::float) * 100, 2) as completion_percentage
FROM survey s
CROSS JOIN users u
LEFT JOIN survey_response sr ON s.id = sr.survey_id AND u.id = sr.user_id
GROUP BY s.id, s.title;

-- Average participation per survey
SELECT 
    s.id as survey_id,
    s.title,
    AVG(COALESCE(sr.score, 0)) as average_score
FROM survey s
LEFT JOIN survey_response sr ON s.id = sr.survey_id
GROUP BY s.id, s.title;

-- Response trends over time
SELECT 
    DATE_TRUNC('month', sr.created_at) as month,
    s.title,
    AVG(sr.score) as average_score
FROM survey_response sr
JOIN survey s ON sr.survey_id = s.id
GROUP BY month, s.title
ORDER BY month, s.title;

-- Comparative analysis between grades
SELECT 
    u.grade,
    s.title,
    AVG(sr.score) as average_score
FROM survey_response sr
JOIN survey s ON sr.survey_id = s.id
JOIN users u ON sr.user_id = u.id
GROUP BY u.grade, s.title
ORDER BY u.grade, s.title; 