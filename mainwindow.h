#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QMessageBox>
#include "src/ToxicCalc.hpp"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    ToxicCalc* toxCalc;

private slots:
    void addJSObject();

public slots:
    void webViewQuitClicked ();
    void showTestPromt();
    float calculate( QString _svsp_type, QString _temp, QString _chemicals, QString _nhr_value, QString _wind, QString _obval );
};

#endif // MAINWINDOW_H
