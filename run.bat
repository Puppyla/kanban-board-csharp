@echo off
echo Iniciando Quadro Kanban...
echo.
echo Verificando .NET SDK...
dotnet --version
if %errorlevel% neq 0 (
    echo.
    echo ERRO: .NET SDK nao encontrado!
    echo Por favor, instale o .NET 8.0 SDK de:
    echo https://dotnet.microsoft.com/download/dotnet/8.0
    echo.
    pause
    exit /b 1
)

echo.
echo Restaurando dependencias...
dotnet restore

echo.
echo Iniciando aplicacao...
dotnet run

pause
