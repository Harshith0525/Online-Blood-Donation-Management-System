$hospitals = @(
    @{name="City General Hospital"; address="Banjara Hills, Hyderabad"; rating=4.8},
    @{name="Red Cross Medical Center"; address="Madhapur, Hyderabad"; rating=4.5},
    @{name="Apollo Health City"; address="Jubilee Hills, Hyderabad"; rating=4.9}
)
 
foreach ($h in $hospitals) {
    $json = $h | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:8080/api/hospitals" -Method Post -Body $json -ContentType "application/json"
    Write-Host "Added: $($h.name)"
}
 
$requests = @(
    @{patientName="Rahul Sharma"; bloodType="O+"; urgency="URGENT"; location="Hyderabad"; requiredUnits=2; hospitalName="City General"},
    @{patientName="Priya Singh"; bloodType="AB-"; urgency="NORMAL"; location="Secunderabad"; requiredUnits=1; hospitalName="Red Cross"}
)
 
foreach ($r in $requests) {
    $json = $r | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:8080/api/requests" -Method Post -Body $json -ContentType "application/json"
    Write-Host "Added Request: $($r.patientName)"
}
