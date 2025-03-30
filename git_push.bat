@echo off
setlocal

:: Запрашиваем сообщение коммита
set /p commit_message="Введите сообщение коммита: "

:: Добавляем все изменения
git add .

:: Создаем коммит
git commit -m "%commit_message%"

:: Пушим изменения в удаленный репозиторий (по умолчанию в origin и текущую ветку)
git push

echo.
echo Операция завершена!
pause