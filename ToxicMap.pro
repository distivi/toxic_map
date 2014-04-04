greaterThan(QT_MAJOR_VERSION, 4):QT += widgets webkitwidgets sql core gui
# Add more folders to ship with the application, here
folder_01.source = www
folder_01.target = .
DEPLOYMENTFOLDERS = folder_01

# Define TOUCH_OPTIMIZED_NAVIGATION for touch optimization and flicking
#DEFINES += TOUCH_OPTIMIZED_NAVIGATION

# If your application uses the Qt Mobility libraries, uncomment the following
# lines and add the respective components to the MOBILITY variable.
# CONFIG += mobility
# MOBILITY +=

# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp \
    src/ToxicCalc.cpp \
    mainwindow.cpp

# Please do not modify the following two lines. Required for deployment.
include(html5applicationviewer/html5applicationviewer.pri)
qtcAddDeployment()

HEADERS += \
    src/ToxicCalc.hpp \
    mainwindow.h

FORMS += \
    mainwindow.ui

OTHER_FILES += \
    db/my_db.sqlite
