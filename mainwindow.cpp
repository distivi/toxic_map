#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QWebFrame>
#include <QDebug>


MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    toxCalc=new ToxicCalc;

    connect(ui->webView->page()->mainFrame(), SIGNAL(javaScriptWindowObjectCleared()),
            this, SLOT(addJSObject()));
    ui->webView->load("file:///"+QApplication::applicationDirPath() + "/www/index.html");
    qDebug()<<QString("Using html file:///"+QApplication::applicationDirPath() + "/www/index.htm");
}

void MainWindow::addJSObject() {
    ui->webView->page()->mainFrame()->addToJavaScriptWindowObject(QString("mainWindow"), this);
}

void MainWindow::webViewQuitClicked ()
{
    qApp->quit();
}

void MainWindow::showTestPromt()
{
    //qDebug() << "Hello from js";
    QMessageBox::information(this, QString("From Web"),QString("Hello from js"));
}

float MainWindow::calculate(QString _svsp_type, QString _temp, QString _chemicals, QString _nhr_value, QString _wind, QString _obval)
{
    QMessageBox::information(this, QString("From Web"),QString("Calculation data goted"));
    toxCalc->define_deep(_svsp_type.toStdString(),_temp.toStdString(),_chemicals.toStdString(),_nhr_value.toStdString(),_wind.toStdString(),_obval.toStdString());
    return toxCalc->getWidth();
    return .5f;
}

MainWindow::~MainWindow()
{
    delete ui;
}
