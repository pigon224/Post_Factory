FROM python:3

RUN mkdir -p /home/project_app

COPY try.py /home/project_app

#WORKDIR /home/project_app
#COPY try.py .
CMD ["python", "/home/project_app/try.py"]