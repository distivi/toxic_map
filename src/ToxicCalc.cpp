#include "ToxicCalc.hpp"

#include <map>

ToxicCalc::ToxicCalc()
{
    std::cout << "ToxicCalc()\n";
    width_coef_map["inversion"]=0.6;
    width_coef_map["izoterm"]=0.75;

    load_data();

}

bool ToxicCalc::openDB()
{
    return true;
}

void ToxicCalc::load_data()
{
    map<int,float> chlorine_map;
    map<int,float> amonia_map;

    chlorine_map[1.0] = 2.1;
    chlorine_map[2.0] = 2.4;
    chlorine_map[3.0] = 2.5;

    amonia_map[1] = 2.0;
    amonia_map[2] = 2.25;
    amonia_map[3] = 2.35;
    
    this->obval_depth_decrease_coef_map["chlorine"] = chlorine_map;
    this->obval_depth_decrease_coef_map["amonia"] = amonia_map;
}

void ToxicCalc::define_deep(string _svsp_type,string _temp, string _chemicals, string _nhr_value, string _wind, string _obval)
{

    qDebug() << "Define_deep\n";

    QSqlDatabase dbase = QSqlDatabase::addDatabase("QSQLITE");
    dbase.setDatabaseName("my_db.sqlite");
    if (!dbase.open()) {
        qDebug() << "Что-то не так с соединением!";
    }

    bool b;
    QSqlQuery sql_query;
    QString str;

    str="select depth from spreading_depth_t where( svsp_name='%1' and chemical_type='%2' and nhr_value='%3' and air_temp='%4' and wind_speed='%5')";

    QString executed_str;
    executed_str = str.arg(_svsp_type.c_str())
        .arg(_chemicals.c_str())
        .arg(_nhr_value.c_str())
        .arg(_temp.c_str())
        .arg(_wind.c_str());

    b = sql_query.exec(executed_str);
    if (!b) 
    {
        qDebug() << "Something wrong\n";
    }

    QString depth;
    if (sql_query.next()) {
        QSqlRecord record_gr = sql_query.record();
        depth = sql_query.value(record_gr.indexOf("depth")).toString();//.toInt();
    }

    qDebug() << depth.toDouble();
    float decreased_depth;
    float decrease_coef;
    qDebug()<<"obval="<<QString(_obval.c_str())<<'\n';

    decrease_coef=this->obval_depth_decrease_coef_map[_chemicals][atof(_obval.c_str())];
    qDebug() << "Decrease coef="<<decrease_coef;

    decreased_depth=depth.toDouble()/(double)decrease_coef;
    qDebug() << "Decreased depth="<<decreased_depth;
    this->f_depth = decreased_depth;

    this->width = pow(0.3*decreased_depth,width_coef_map[_svsp_type]);
    qDebug() << "Width=" << this->width;
}
