
$venv = ".\venv\Scripts\Activate.ps1"
if (Test-Path $venv) {
    & $venv
} else {
    Write-Error "Virtual environment nuk u gjet!"
    exit
}

Start-Process powershell -ArgumentList "-NoExit","-Command","redis-server --port 6380"

Start-Process powershell -ArgumentList "-NoExit","-Command","celery -A core worker --loglevel=info -P solo"

Start-Process powershell -ArgumentList "-NoExit","-Command","python manage.py runserver"
