#include <QtSql>
#include <QTableView>
#include <QVBoxLayout>
#include <QWidget>
#include <QPushButton>
#include <iostream>
#include <string>
#include <fstream>
#include <exception>
#include <QApplication>

#include <map>
#include <math.h>

using namespace std;

class ToxicCalc
{
    public:
        ToxicCalc();
        void define_deep(string _svsp_type, string _temp, string _chemicals, string _nhr_value, string _wind, string _obval);
        float get_width();
        float get_square();
        void load_data();
        float getWidth() { return this->width; }
        float getDepth() { return this->f_depth; }



    private:
        bool openDB();
        bool error;
        float width;
        float f_depth;
        QString str_query;
        QSqlQuery sql_query;
        map<string,float> width_coef_map;
        map< string,map<int,float> > obval_depth_decrease_coef_map;
        /*
         * coef_map = obval_depth_decrease_coef_map['chlorine']
         * decrease_coef = coef_map[obval_height]
         */
};
