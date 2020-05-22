const nj = require('nornj');

const tmpl = `
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
    />
  </head>
  <body>
    <div style="padding: 0;max-width: 600px;margin: 0 auto;">
        <div id="contentDiv" style="position:relative;font-size:14px;height:auto;z-index:1;zoom:1;line-height:1.7;" class="body">    <div id="qm_con_body"><div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only">
            <style type="text/css">
            .qmbox h1 { color: #767171 !important; font-family: '微软雅黑', '黑体', '宋体'; font-size: 28px; font-weight: bold; font-style: '微软雅黑', '黑体', '宋体'; text-shadow:0px -1px 2px #c1c2c3;}
            .qmbox h2 { font-family: '微软雅黑', '黑体', '宋体'; font-size: 16px; color: #2b2b2b !important; font-style: '微软雅黑', '黑体', '宋体'; border-bottom: 1px solid #c1c1c1; padding: 5px 0 5px 0; font-weight: normal; margin: 0 0 20px 0; }
            .qmbox a { color: #767171; font-style: '微软雅黑', '黑体', '宋体'; font-size: 16px; line-height: 28px; }
            .qmbox p { font-family: '微软雅黑', '黑体', '宋体'; font-size: 16px; color: #767171; line-height: 18px; margin-bottom: 12px; }
            .qmbox h3 { font-family: '微软雅黑', '黑体', '宋体'; font-size: 18px; color: #767171; line-height: 34px; letter-spacing:1px; margin-bottom: 30px; font-weight: 300; text-shadow:0 0 1px #a8a5a5;}
            .qmbox .footer p { margin: 0; }
            </style>
            
            <table cellspacing="0" border="0" style="background-color: #fafafa;padding: 40px;" cellpadding="0" width="100%">
                <tbody><tr>
                    <td valign="top">
                        <table cellspacing="0" border="0" align="center" cellpadding="0" width="100%">  
                            <tbody>
                            <tr>
                                <td valign="top">
                                    <table cellspacing="0" border="0" cellpadding="0" width="100%">
                                        <tbody><tr> 
                                            <td height="90" valign="top">
                                               </td><td class="main-title" align="center" valign="middle" width="100%">
                                                    <h1>
                                                        <singleline label="Title">
                                                        来自很久以前的一封信
                                                        </singleline>
                                                    </h1>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
            
                            <tr>
                                <td valign="top">
                                   <repeater>
                                        <table cellspacing="0" border="0" align="center" cellpadding="0" width="80%" style="max-width: 800px;">
                                            <tbody>
                                                <tr>
                                                    <td valign="top">
                                                        <multiline>
                                                            <h3>
                                                            写信时间<span style="border-bottom:1px dashed #ccc;">{{timeData.date}}</span> {{timeData.time}}
                                                            </h3>
                                                            <div>{{{ content }}}</div>
                                                        </multiline>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </repeater>
                                </td>
                            </tr>
                            
                            <tr>
                                <td valign="top">
                                    <table class="footer" cellspacing="0" border="0" cellpadding="0" width="100%">
                                        <tbody><tr>
                                            <td valign="top"> </td>
                                        </tr>
                                        <tr>
                                            <td align="center" class="footer" valign="top" font-size:="font-size:" px="px" color:="color:" b2b2b="b2b2b" line-height:="line-height:">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody><tr>
                                                        <td height="15"></td>
                                                    </tr>
                                                </tbody></table>
                                                <p style="width: 80%;">
                                                    <unsubscribe style="color: #767171;">
                                                        <a href="http://zcssite.com/email" style="text-decoration: none; color: #767171; font-weight: bold;" rel="noopener" target="_blank">
                                                            通过 zcssite.com 网站 寄出
                                                        </a>
                                                    </unsubscribe>
                                                </p>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody><tr>
                                                        <td height="15"></td>
                                                    </tr>
                                                </tbody></table>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table><style type="text/css">.qmbox style, .qmbox script, .qmbox head, .qmbox link, .qmbox meta {display: none !important;}</style></div></div><!-- --><style>#mailContentContainer .txt {height:auto;}</style>  
        </div>
    </div>   
  </body>
</html>


`
nj.textMode = true

const tmplFn = nj.compile(tmpl, 'tmpl1');


module.exports =  tmplFn;



