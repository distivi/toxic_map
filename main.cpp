#include <QApplication>
#include "mainwindow.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    MainWindow mwindow;
    mwindow.show();
    //Html5ApplicationViewer viewer;
    //viewer.setOrientation(Html5ApplicationViewer::ScreenOrientationAuto);
    //viewer.showExpanded();
    //viewer.loadFile(QLatin1String("www/index.html"));

    return app.exec();
}
