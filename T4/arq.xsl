<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="index.html">
            <html>
                <head>
                    <title>Arqueossítios do NW Português</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
                    <style>
                        .footer {
                        position: fixed;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        background-color: #4D7298;
                        color: white;
                        text-align: center;
                        }
                    </style>
                </head>
                <body style="Background-color: #fcfffc;">
                    <div class="w3-bar" style="background-color: #4D7298; color: white;">
                        <div class="w3-bar-item">Arqueossítios do NW Português</div>
                    </div> 
                    <div class="w3-container w3-center">
                        <h3>Índice de Arqueossítios:</h3>
                        <div class="w3-container w3-left-align" style="padding-bottom: 60px;">
                            <ol style="columns: 2;">
                                <xsl:apply-templates select="//ARQELEM" mode="indice">
                                    <xsl:sort select="IDENTI"></xsl:sort>
                                </xsl:apply-templates>
                            </ol>
                        </div>
                    </div>
                    <div class="footer">
                        <p>DAW 2020 - TPC3</p>
                    </div> 
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM" mode="spages">
            <xsl:sort select="IDENTI"></xsl:sort>
        </xsl:apply-templates>
    </xsl:template>
    
    <!-- Templates Índice .......................................... -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{position()}"/>
            <a href="http://localhost:7777/arqs/{position()}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates Conteúdo ........................................ -->
    
    <xsl:template match="ARQELEM" mode="spages">
        <xsl:result-document href="site/arq{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
                    <style>
                        .footer {
                        position: fixed;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        background-color: #4D7298;
                        color: white;
                        text-align: center;
                        }
                    </style>
                </head>
                <body style="Background-color: #fcfffc;">
                    <div class="w3-bar" style="background-color: #4D7298; color: white;">
                        <div class="w3-bar-item">Arqueossítio do NW Português</div>
                    </div> 
                    <div class="w3-container">
                        <div class="w3-container w3-left">
                            <h3>Dados:</h3>
                            <xsl:apply-templates select="IDENTI"/>
                            <xsl:apply-templates select="LUGAR"/>
                            <xsl:apply-templates select="FREGUE"/>
                            <xsl:apply-templates select="CONCEL"/>
                            <xsl:apply-templates select="CODADM"/>
                            <xsl:apply-templates select="LATITU"/>
                            <xsl:apply-templates select="LONGIT"/>
                            <xsl:apply-templates select="ALTITU"/>
                        </div>
                        
                        <div class="w3-container w3-left" style=" text-align: justify;">
                            <h3>Detalhes: </h3>
                            <xsl:apply-templates select="IMAGEM"/>
                            <xsl:apply-templates select="DESCRI"/>
                            <xsl:apply-templates select="CRONO"/>
                            <xsl:apply-templates select="INTERP"/>
                            <xsl:apply-templates select="ACESSO"/>
                            <xsl:apply-templates select="QUADRO"/>
                            <xsl:apply-templates select="TRAARQ"/>
                            <xsl:apply-templates select="DESARQ"/>
                            <xsl:apply-templates select="INTERE"/>
                            <xsl:apply-templates select="DEPOSI"/>
                        </div>
                        
                        <div class="w3-container w3-left">
                            <h3>Bibliografia: </h3>
                            <xsl:apply-templates select="BIBLIO"/>
                        </div>
                        
                        <div class="w3-container w3-center" style="padding-bottom: 100px;">
                            <p><xsl:value-of select="AUTOR"/> - <xsl:value-of select="DATA"/></p>
                            [<a href="{position()-1}">Anterior</a>]
                            [<a href="index.html#i{position()}">Voltar à Página Inicial</a>]
                            [<a href="{position()+1}">Seguinte</a>]
                            
                        </div>
                    </div>
                    
                    
                    <div class="footer">
                        <p>DAW 2020 - TPC3</p>
                    </div> 
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="IDENTI">
        <p><b>Identificador:</b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LUGAR[text() != '']">
        <p><b>Lugar: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="FREGUE">
        <p><b>Freguesia: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CONCEL">
        <p><b>Concelho: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CODADM">
        <p><b>Código Administrativo: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LATITU">
        <p><b>Latitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LONGIT">
        <p><b>Longitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ALTITU">
        <p><b>Altitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="BIBLIO">
            <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="IMAGEM">
        <p><b>Imagem:</b> <xsl:value-of select="./@NOME"/></p>
    </xsl:template>
    
    <xsl:template match="DESCRI">
        <p><b>Descrição:</b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CRONO">
        <p><b>Cronologia: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <p><b>Acesso: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <p><b>Quadro: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <p><b>Trabalhos Arqueológicos: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <p><b>Defesas: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="INTERE">
        <p><b>Interesse: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DEPOSI">
        <p><b>Deposi: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="INTERP">
        <p><b>Interp: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
</xsl:stylesheet>