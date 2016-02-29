$(document).on('ready',document, function(){
	var antec = document.getElementsByName("antec");
	var tiempos 	= $("[id^='tiempo']");
	var valida = false;
	var array_act = [];
	var array_tiempo = [];
	var cantidad_actividad = 0;
	var id_device = '';
	$( "#dialog-message" ).dialog({
      	modal: true,
    	buttons: {
        Aceptar: function() {
          $( this ).dialog( "close" );
        }
      }
    });

    $( "#dialog-message" ).dialog("close");

    $( "#dialog_message_concept" ).dialog({
      	modal: true,
    	buttons: {
        Aceptar: function() {
          $( this ).dialog( "close" );
        }
      }
    });

    $( "#dialog_message_concept" ).dialog("close");

});

/*Reorganizar consecutivo*/
function organizar()
{
	cantidad_temp = document.getElementsByName("antec").length
	cantidad_actividad = cantidad_temp;
}

/*Calculo de Tiempo esperado*/
function tiempo_esperado(tiempo_op, tiempo_pe, tiempo_pr)
{
	/*Formula de Tiempo esperado -->  te = (a+4m+b)/6  donde a=optimista, m=promedio, b=pesimista */
	x = ((parseInt(tiempo_op) + (4 * parseInt(tiempo_pr)) + parseInt(tiempo_pe))/6);
	return x;
}

/*Calculo Desvi Estandar*/
function varianza(tiempo_op, tiempo_pe)
{
	/*Formula para la desviacion estandar --> desv. estandar = ((b-a)^2)/36   donde a=optimista, m=promedio */
	console.log((Math.exp(parseInt(tiempo_pe) - parseInt(tiempo_op)))/36);
	return (((parseInt(tiempo_pe) - parseInt(tiempo_op))*(parseInt(tiempo_pe) - parseInt(tiempo_op))))/36;
}


//*** Este Codigo permite Validar que sea un campo Numerico
function Solo_Numerico(variable, cantidad){

	numero_antec = document.getElementsByName("antec").length;
	letra = '';
	text_final = '';
	for (var i = 0; i < variable.length && variable.length < (cantidad+1); i++) {
		letra = variable[i];
		// ,|
		valida 		= letra.search(/(,|[1-9])+/g);
		
		if(valida){
		    Numer=parseInt(letra);
		    if (!isNaN(Numer)){
		        text_final = text_final + Numer;
		    }
		}else{
			text_final = text_final + letra;
		}
	};

	if ( variable.length > (cantidad)) {
		letra = '';
		text_final = '';
		for (var i = 0; i < (cantidad) ; i++) {
			letra = variable[i];
			// ,|
			valida 		= letra.search(/(,|[1-9])+/g);
			
			if(valida){
			    Numer=parseInt(letra);
			    if (!isNaN(Numer)){
			        text_final = text_final + Numer;
			    }
			}else{
				text_final = text_final + letra;
			}
		};
	};

    return text_final;
}
function ValNumero(Control, cantidad){
    Control.value=Solo_Numerico(Control.value , cantidad);
}
//*** Fin del Codigo para Validar que sea un campo Numerico

function cargar_actividades(cantidad, tiempo){
	if(localStorage['id_proyecto'] != null)
	{
		cargar_detalle_actividades(1, localStorage['id_proyecto']);
		act_proy_sesion = JSON.parse(localStorage['abrir']);
		act_proy = act_proy_sesion;
		actividad_cargar = act_proy.data;
		console.log(actividad_cargar);
		cantidad = act_proy.data.total;

		ronda = 0;		

	}

	for (var i = 0; i < cantidad; i++) {	
		nom_act=null;
		pred = null;
		t_esp = null;
		if(localStorage['id_proyecto'] != null)
		{
			if(actividad_cargar[i]['Nombre_Actividad'] != null ) nom_act = " value='"+actividad_cargar[i]['Nombre_Actividad'] +"' readonly='readonly'";
			if(actividad_cargar[i]['Tesperado_Actividad'] != null ) t_esp = " value='"+actividad_cargar[i]['Tesperado_Actividad'] +"' readonly='readonly'";
			if(actividad_cargar[i]['Numero_Actividad'] != null ) pred = " value='"+actividad_cargar[i]['Numero_Actividad'] +"' readonly='readonly'";

		}
		$('#content_activities').append('<div class="act_detail"><div><input type="text" id="actividad_'+i+'" '+nom_act+' class="text" placeholder="Nombre Actividad '+(i+1)+'" style="width: 100%;"/></div><div><h4>Tiempo actividad '+(i+1)+': </h4><input type="number" id="tiempo_'+i+'" min="0" max="999" class="text" onkeyUp="return ValNumero(this, 3);" required="required" '+t_esp+'/>&nbsp;' + tiempo + '</div><div><h4>Precede '+(i+1)+': </h4><input type="text" class="text"  placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this, 100);" '+pred+' style="width: 100%;" /></div></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};
	cantidad_actividad = i;
	$('#content_activities').append('<div><input type="button" class="submitlittle" id="act_detail'+(i+1)+'" value="+" onClick="agregar_actividades(this,\'' + tiempo + '\');"></div>');

	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" class="submit" value="Cargar Tiempo" onClick="javascript:carga_info();" /><input type="button" class="submit" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
}

function cargar_actividades_avanzado(cantidad, tiempo){
	if(localStorage['id_proyecto'] != null)
	{
		cargar_detalle_actividades(2, localStorage['id_proyecto']);
		act_proy_sesion = JSON.parse(localStorage['abrir']);
		act_proy = act_proy_sesion;
		actividad_cargar = act_proy.data;
		console.log(actividad_cargar);
		cantidad = act_proy.data.total;

		ronda = 0;		

	}

/*	if(cantidad > 5)
	{
		$('.footer').attr('position', 'relative');
	}*/
		nom_act=null;
		pred = null;
		t_opt = null;
		t_pes = null;
		t_pro = null;
		cos_act = null;
	for (var i = 0; i < cantidad; i++) {		
		if(localStorage['id_proyecto'] != null)
		{
			if(actividad_cargar[i]['Nombre_Actividad'] != null ) nom_act = " value='"+actividad_cargar[i]['Nombre_Actividad'] +"' readonly='readonly'";
			if(actividad_cargar[i]['Toptimista_Actividad'] != null ) t_opt = " value='"+actividad_cargar[i]['Toptimista_Actividad'] +"' readonly='readonly'";
			if(actividad_cargar[i]['Tpesimista_Actividad'] != null ) t_pes = " value='"+actividad_cargar[i]['Tpesimista_Actividad'] +"' readonly='readonly'";
			if(actividad_cargar[i]['Tprobable_Actividad'] != null ) t_pro = " value='"+actividad_cargar[i]['Tprobable_Actividad'] +"' readonly='readonly'";
			if(actividad_cargar[i]['Costo_Actividad'] != null ) cos_act = " value='"+actividad_cargar[i]['Costo_Actividad'] +"' readonly='readonly'";
			if(actividad_cargar[i]['Numero_Actividad'] != null ) pred = " value='"+actividad_cargar[i]['Numero_Actividad'] +"' readonly='readonly'";
			
		}
		$('#content_activities').append('<div class="act_detail"><span>Actividad '+(i+1)+'</span><table><tr><td><label>Nombre Actividad '+(i+1)+': </td><td>&nbsp;<input type="text" id="actividad_'+i+'" '+nom_act+' style="width: 90%;"/></td></tr><tr><td><label>T. Optimista '+(i+1)+': </td><td>&nbsp;<input type="number" id="tiempo_o_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" '+t_opt+' />&nbsp;' + tiempo + '</td></tr><tr><td></label><label>T. Pesimista '+(i+1)+': </td><td>&nbsp;<input type="number" id="tiempo_e_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" '+t_pes+'/>&nbsp;' + tiempo + '</td></tr><tr><td></label><label>T. Probable '+(i+1)+': </td><td>&nbsp;<input type="number" id="tiempo_pr_'+i+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" '+t_pro+'/>&nbsp;' + tiempo + '</label></td></tr><tr><td><label>Costo Act. '+(i+1)+': </td><td>&nbsp;<input type="number" id="costo_'+i+'" min="0" max="1000" '+cos_act+'/></label></td></tr><tr><td><label>Precede '+(i+1)+': </td><td>&nbsp<input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+i+'" onkeyUp="return ValNumero(this, 100);" '+pred+' style="width: 90%;"/></label></td></tr></table></div>');
		if((i+1) != cantidad)
		{
			$('#content_activities').append('<div id="separador"></div>');
		}
	};
	cantidad_actividad = i;
	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(i+1)+'" value="+" onClick="agregar_actividades_avanzado(this,\'' + tiempo + '\');">');

	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info_avanzado();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
}

function agregar_actividades(value, tiempo){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador" class="separador'+(cantidad_actividad+1)+'"></div>');

	$('#content_activities').append('<div class="act_detail"><input type="button" value="X" class="submitremove" onClick="javascript:$(this).parent().remove(); $(\'#act_detail'+(cantidad_actividad+1)+'\').remove(); $(\'.separador'+(cantidad_actividad+1)+'\').remove(); organizar();" /><h3>Nombre Actividad '+(cantidad_actividad+1)+':</h3><input type="text" id="actividad_'+cantidad_actividad+'" style="width: 100%;" placeholder="Nombre Actividad '+(cantidad_actividad+1)+'"/><h3>Tiempo actividad '+(cantidad_actividad+1)+':</h3><input type="number" id="tiempo_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '<h3>Precede '+(cantidad_actividad+1)+':</h3><input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this, 100);" style="width: 100%;" placeholder="Precede '+(cantidad_actividad+1)+'"/></div>');

	$('#content_activities').append('<div><input type="button" class="submitlittle" type="button" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades(this,\'' + tiempo + '\');"></div>');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" class="submit" value="Cargar Tiempo" onClick="javascript:carga_info();" /><input type="button" class="submit" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide(); $(\'#actividades\').hide();" value="Regresar" /></div>');
	cantidad_actividad++;
}

function agregar_actividades_avanzado(value, tiempo){

	$('#content_activities .contact-but > input').remove();
	
	$('#content_activities').append('<div id="separador" class="separador'+(cantidad_actividad+1)+'"></div>');

	$('#content_activities').append('<div class="act_detail"><div class="borrar_act" onClick="javascript:$(this).parent().remove(); $(\'#act_detail'+(cantidad_actividad+1)+'\').remove(); $(\'.separador'+(cantidad_actividad+1)+'\').remove(); organizar();">X</div><span>Actividad '+(cantidad_actividad+1)+'</span><table><tr><td><label>Nombre Actividad '+(cantidad_actividad+1)+': </td><td>&nbsp;<input type="text" id="actividad_'+cantidad_actividad+'" style="width: 90%;"/></td></tr><tr><td><label>T. Optimista '+(cantidad_actividad+1)+': </td><td>&nbsp;<input type="number" id="tiempo_o_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);" />&nbsp;' + tiempo + '</label></td></tr><tr><td><label>T. Pesimista '+(cantidad_actividad+1)+': </td><td>&nbsp<input type="number" id="tiempo_e_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '</label></td></tr><tr><td><label>T. Probable '+(cantidad_actividad+1)+': </td><td>&nbsp<input type="number" id="tiempo_pr_'+cantidad_actividad+'" min="0" max="1000" onkeyUp="return ValNumero(this, 3);"/>&nbsp;' + tiempo + '</label></td></tr><tr><td><label>Costo Act. '+(cantidad_actividad+1)+': </td><td>&nbsp<input type="number" id="costo_'+cantidad_actividad+'" min="0" max="1000"/></label></td></tr><tr><td><label>Precede '+(cantidad_actividad+1)+': </td><td>&nbsp<input type="text" placeholder="Ejemplo 1,2,..,n" name="antec" id="antec_'+cantidad_actividad+'" onkeyUp="return ValNumero(this, 100);" style="width: 90%;"/></label></td></tr></table></div>');

	$('#content_activities').append('<input type="button" class="boton_agrega" id="act_detail'+(cantidad_actividad+1)+'" value="+" onClick="agregar_actividades_avanzado(this,\'' + tiempo + '\');">');
	$('#content_activities').append('<div class="contact-but"><input type="button" id="cargart" value="Cargar Tiempo" onClick="javascript:carga_info_avanzado();" /></div> <div class="contact-but"><input type="button" id="volvert" onClick="javascript:$(\'#info_proyecto\').show(); $(\'#content_activities\').hide();$(\'#actividades\').hide()" value="Regresar" /></div>');
	cantidad_actividad++;
}

function alista_info()
{
	var antec 			= document.getElementsByName("antec");
	var fecha_inicial	= document.getElementsByName("f_inicio");
	var tiempos 		= $("[id^='tiempo']");
	var nombre_act 		= $("[id^='actividad_']");
	var valida 			= false;
	var array_act 		= [];
	var array_tiempo 	= [];
	var array_nombre 	= [];
	var result 			= Array(5);

	for (var i = 0; i < nombre_act.length; i++) {
		if( nombre_act[i].value==null || nombre_act[i].value== '' )
		{
			valida = false;
			$('#dialog-message').html('<br><p>Debe ingresar el nombre de cada actividad</p>');
			$('#dialog-message').dialog("open");
			break;
		}
		array_nombre[i] = {nombre:nombre_act[i].value};		
	}
	
	for (var i = 0; i < antec.length; i++) { 
		if( antec[i].value!=null && antec[i].value!='')
		{
			valida = true;
			valida_antec = antec[i].value.split(',');
			for (var k = 0; k < valida_antec.length; k++) {
				if( parseInt(valida_antec[k]) > antec.length || (i+1) == parseInt(valida_antec[k]) )
				{
					valida = false;
				}
			};
		}		
		array_act[i] = {antec:antec[i].value};
	}


	if(!valida)
	{
		$('#dialog-message').html('<br><p>Algunas actividades dependen de la ejecuci&oacute;n de otras, hay que evaluar cuales son las actividades predecesoras de cada una de ella</p>');
		$('#dialog-message').dialog("open");
		return false;
	}

	for (var i = 0; i < tiempos.length; i++) {
		if( tiempos[i].value==null || tiempos[i].value<= 0 )
		{
			valida = false;
			$('#dialog-message').html('<br><p>Debe ingresar el tiempo para cada actividad</p>');
			$('#dialog-message').dialog("open");
			break;
		}
		array_tiempo[i] = {tiempo:tiempos[i].value};		
	}	

	//console.log(valida);return false;
	/*console.log(array_act);
	console.log(array_tiempo);*/
	result[0]=array_act;
	result[1]=array_tiempo;
	result[2]=valida;
	result[3]=tiempos;
	result[4]=antec;
	result[5]=array_nombre;
	result[6]=fecha_inicial[0].value
	console.log(result);
	return result ;
}

function alista_info_avanzado()
{
	var antec 				= document.getElementsByName("antec");
	var fecha_inicial		= document.getElementsByName("f_inicio");
	var presupuesto			= document.getElementsByName("presupuesto");
	var tiempos_o 			= $("[id^='tiempo_o']");
	var tiempos_p 			= $("[id^='tiempo_e']");
	var tiempos_pr 			= $("[id^='tiempo_pr']");
	var nombre_act 			= $("[id^='actividad_']");
	var costo 				= $("[id^='costo']");
	var valida 				= false;
	var array_act 			= [];
	var array_t_optimista 	= [];
	var array_t_pesimista 	= [];
	var array_t_probable 	= [];
	var array_t_esperado 	= [];
	var array_d_estandar 	= [];
	var array_varianza  	= [];
	var array_nombre 		= [];
	var array_costo 		= [];
	var result 				= Array(10);
	
	console.log(tiempos_o);
	console.log(tiempos_p);
	console.log(tiempos_pr);

	for (var i = 0; i < antec.length; i++) { 
		if( antec[i].value!=null && antec[i].value!='')
		{
			valida = true;
		}		
		array_act[i] = {antec:antec[i].value};
	}

	for (var i = 0; i < nombre_act.length; i++) { 
		if( nombre_act[i].value!=null && nombre_act[i].value!='')
		{
			valida = true;
			valida_actividad = nombre_act[i].value.split(',');
			for (var k = 0; k < valida_actividad.length; k++) {
				if( parseInt(valida_actividad[k]) > nombre_act.length || (i+1) == parseInt(valida_actividad[k]) )
				{
					valida = false;
				}
			};
		}		
		array_nombre[i] = {nombre:nombre_act[i].value};
	}

	array_t_optimista[0]	={}
	array_t_pesimista[0]	={}
	array_t_probable[0]		={}
	array_t_esperado[0]		={}
	array_d_estandar[0]		={}
	array_varianza[0]		={}
	array_costo[0]			={}
	for (var i = 0; i < tiempos_o.length; i++) {
		if( tiempos_o[i].value==null || tiempos_o[i].value<= 0  || tiempos_p[i].value==null || tiempos_p[i].value<= 0 || tiempos_pr[i].value==null || tiempos_pr[i].value<= 0 )
		{
			valida = false;
			$('#dialog-message').html('<br><p>Debe ingresar todos los tiempos para cada actividad</p>');
			$('#dialog-message').dialog("open");
			break;
		}
		array_t_optimista[i]	= {tiempo:tiempos_o[i].value};		
		array_t_pesimista[i]	= {tiempo:tiempos_p[i].value};		
		array_t_probable[i]  	= {tiempo:tiempos_pr[i].value};		
		array_t_esperado[i]  	= {tiempo: tiempo_esperado( tiempos_o[i].value, tiempos_p[i].value, tiempos_pr[i].value) };
		array_varianza[i]  		= {tiempo: varianza( tiempos_o[i].value, tiempos_p[i].value) };		
		array_d_estandar[i]  	= {tiempo: Math.sqrt(parseFloat(array_varianza[i]['tiempo'])) };		
		array_d_estandar[i]  	= {tiempo: Math.sqrt(parseFloat(array_varianza[i]['tiempo'])) };
		array_costo[i]			= {valor: costo[i].value};		
	}

	if(!valida)
	{
		$('#dialog-message').html('<br><p>Algunas actividades dependen de la ejecuci&oacute;n de otras, hay que evaluar cuales son las actividades predecesoras de cada una de ellas</p>');
		$('#dialog-message').dialog("open");
	}



	/*var tiempos 		= $("[id^='tiempo']");
	for (var i = 0; i < antec.length; i++) { 
		if( antec[i].value!=null && antec[i].value!='')
		{
			valida = true;
		}		
		array_act[i] = {antec:antec[i].value};
	}
	for (var i = 0; i < tiempos.length; i++) {
		if( tiempos[i].value==null || tiempos[i].value<= 0 )
		{
			valida = false;
			break;
		}
		array_tiempo[i] = {tiempo:tiempos[i].value};		
	}*/
	/*console.log(array_act);
	console.log(array_tiempo);*/

	result[0]=array_act;
	result[1]=valida;
	// result[2]=tiempos;
	result[2]=antec;
	result[3]=array_t_optimista;
	result[4]=array_t_pesimista;
	result[5]=array_t_probable;
	result[6]=array_t_probable;
	result[7]=array_t_esperado;
	result[8]=array_d_estandar;
	result[9]=array_varianza;
	result[10]=array_nombre;
	result[11]=fecha_inicial[0].value
	result[12]=presupuesto[0].value;
	result[13]=array_costo;
	console.log(result); //  return false;
	return result ;
}

function carga_info()
{
	result = alista_info();
	valida = result[2];
	array_act = result[0];
	array_tiempo = result[1];
	tiempos = result[3];
	array_tiempo = result[1];
	array_nombres = result[5];
	
	if(valida)
	{
		$('#error').html(null);		
		$('#step_one').hide();
		
		/**
		 * Se genera la tabla con la informacion en resumen de las actividades
		 */
		
		info_to_load = '<table class="table"><thead><tr>';
		info_to_load += '<th>Actividad</th><th style="text-align:center;">Predecesor</th><th style="text-align:center;">Tiempo</th></tr></thead>';
		info_to_load += '<tbody>';
		for (var i = 0; i < tiempos.length; i++) {
			var predecesor = '-';
			if( typeof array_act[i] != "undefined") predecesor = array_act[i].antec;
			info_to_load += '<tr><td>'+array_nombres[i].nombre+'</td><td style="text-align:center;">'+ predecesor +'</td><td style="text-align:center;">'+array_tiempo[i].tiempo+'</td></tr>';
		};

		info_to_load += '</tbody></table>';

		info_to_load += '<div><input type="button" id="volver" value="Volver" class="submit" onClick="javascript:volver_actividades();"/>';
		info_to_load += '<input type="button" id="graficar" value="Graficar" class="submit" onClick="javascript:graficar_pert();" /></div>';
		
		$('#actividades').hide();
		$('#step_two').html(info_to_load);
		$('#step_two').show();
	}
	else 
	{
		//$('#dialog-message').html('Debe completar toda la información del formulario');
		$('#dialog-message').dialog("open");
		//$('#error').html('Debe tener la informaci&oacute;n completa');
		$('#step_one').show();
		$('#step_two').hide();
	}
	$('.header').scrollTo('fast');
	
	//console.log(tiempos);
	//console.log(antec);
}

function carga_info_avanzado()
{
	result 			= alista_info_avanzado();
	valida 			= result[1];
	array_act 		= result[0];
	array_tiempo 	= result[7];
	tiempos 		= result[4];
	//array_tiempo 	= result[1];
	array_t_op 		= result[3];
	array_t_pr 		= result[5];
	array_t_pe 		= result[4];
	array_d_estandar= result[8];
	array_varianza	= result[9];
	array_nombres	= result[10];

	if(valida)
	{
		$('#error').html(null);		
		$('#step_one').hide();
		
		/**
		 * Se genera la tabla con la informacion en resumen de las actividades
		 */
		
		info_to_load = '<style>div#step_two{margin-bottom: 120px;}</style><div style="overflow-x: auto;"><table class="table table-bordered"><thead><tr>';
		info_to_load += '<th>Actividad</th><th style="text-align:center;">Predecesor</th><th style="text-align:center;">a</th><th style="text-align:center;">m</th><th style="text-align:center;">b</th><th style="text-align:center;">te</th><th style="text-align:center;">Desv. Est</th><th style="text-align:center;">Varianza</th></tr></thead>';
		info_to_load += '<tbody>';
		for (var i = 0; i < tiempos.length; i++) {
			var predecesor = '-';
			if( typeof array_act[i] != "undefined") predecesor = array_act[i].antec;
			info_to_load += '<tr><td>'+array_nombres[i].nombre+'</td><td style="text-align:center;">'+ predecesor +'</td><td style="text-align:center;">'+array_t_op[i]['tiempo']+'</td><td style="text-align:center;">'+array_t_pr[i]['tiempo']+'</td><td style="text-align:center;">'+ array_t_pe[i]['tiempo'] +'</td><td style="text-align:center;">'+array_tiempo[i]['tiempo'].toFixed(0)+'</td><td style="text-align:center;">'+array_d_estandar[i]['tiempo'].toFixed(2)+'</td><td style="text-align:center;">'+array_varianza[i]['tiempo'].toFixed(2)+'</td></tr>';
		};

		info_to_load += '</tbody></table></div><br>';
		//a=optimista, m=promedio, b=pesimista 
		info_to_load += '<table class="table"><thead><tr><th>a = Tiempo optimista</th></tr><tr><th>m = Tiempo promedio</th></tr><tr><th>b = Tiempo pesimista</th></tr><tr><th>te = Tiempo esperado <img src="images/tiempo_esperado_final.jpg" style="float: right; margin-right: 40px;"/></th></tr><tr><th>Desv. Est = Desviaci&oacute;n est&aacute;ndar<img src="images/desv_est_final.jpg" style="float: right; margin-right: 40px;"/></th></tr><tr><th>Varianza = <img src="images/varianza_final.jpg" style="float: right; margin-right: 40px;"/></th></tr>';

		info_to_load += '</thead></table>';

		info_to_load += '<div class="contact-but" style="float: right; width: 120px; right: 20px; position: relative;" ><input type="submit" id="volver" value="Volver" style="width: 100%;background: #B6D7A8;" onClick="javascript:volver_actividades();"/></div>';
		info_to_load += '<div class="contact-but" style="float:left; margin: 0 0 0 5px;width: 120px;left: 20px; position: relative;" ><input type="submit" id="graficar" value="Graficar" style="width: 100%;background: #B6D7A8;" onClick="javascript:graficar_avanzado();" /></div>';

		$('#step_two').html(info_to_load);
		$('#step_two').show();
	}
	else 
	{
		//$('#dialog-message').html('Debe tener toda la información del formulario');
		$('#dialog-message').dialog("open");
		//$('#error').html('Debe tener la informaci&oacute;n completa');
		$('#step_one').show();
		$('#step_two').hide();
	}
	$('.header').scrollTo('fast');
	
	//console.log(tiempos);
	//console.log(antec);
}

function volver_actividades()
{
	$('#step_one').show();
	$('#info_proyecto').show();
	$('#step_two').hide();
	$('#step_two').html(null);
	$('#grafica').html(null);
}

function dibujarCanvas(id){
var c=document.getElementById("linea"+id);
        var cxt=c.getContext("2d");
 
        cxt.moveTo(20,10);
        cxt.lineTo(130,100);
        cxt.lineWidth = 7;
        cxt.strokeStyle = "blue";
        cxt.stroke();
}

function habilitar_div (data) {
	console.log(data);
	/**
	 * habilita los Divs sin actividades anteriores
	 */
	var cuenta_ant = 0;
	for (i=0; i < data.length; i++) {
		if( data[i]['antecesor'].length==1 )
			if( data[i]['antecesor'][0] == '' ) {
				$('#actividad_'+cuenta_ant+'_0').css('display','block');
				$('#actividad_'+cuenta_ant+'_0').text(data[i]['actividad']);
				console.log($('#actividad_'+cuenta_ant+'_0'));
				cuenta_ant++;					
			}

	}

	var info_array = Array();

	for (i=0; i < data.length; i++) {
		if( data[i]['antecesor'].length >=1 )
			if( data[i]['antecesor'][0] != '' ) {
				var f = 0;
				for (var j = 0; j < data[i]['antecesor'].length; j++) {
					if( f == ((data[i]['antecesor'].length)-1) ){
						$('#actividad_'+data[i]['antecesor'][j]+'_'+i).css('display','block');
						$('#actividad_'+data[i]['antecesor'][j]+'_'+i).text(data[i]['actividad']);
						dibujarCanvas(i);
						info_array.push(data[i]['actividad']);
					}
					f++;
				};
				cuenta_ant++;					
			}

	}
	console.log(info_array);
}

function graficar_pert()
{
	result = alista_info();
	valida = result[2];
	/*array_act = result[0];
	array_tiempo = result[1];*/
	tiempos = result[3];
	array_tiempo = result[1];
	array_nombre = result[5];

	array_act = Array(tiempos.length);
	array_tiempo = Array(tiempos.length);
	array_nombre = Array(tiempos.length);

	for (var i = 0; i < tiempos.length; i++) 
	{
		array_act[i] = result[0][i];
		array_tiempo[i] = result[1][i];
		array_nombre[i] = result[5][i];
	}

	localStorage["actividad"] = JSON.stringify(array_act);
	localStorage["tiempo"] = JSON.stringify(array_tiempo);
	localStorage["validacion"] = JSON.stringify(valida);
	localStorage["nombre"] = JSON.stringify(array_nombre);
	localStorage["fecha"] = JSON.stringify(result[6]);
	localStorage["cantidad"] = i;
	localStorage["varianza"] = null;
	/*sessionStorage.setItem("actividad", array_act);
	sessionStorage.setItem("tiempo", array_tiempo);
	sessionStorage.setItem("valida", valida);*/

	window.location.href = "grafica.html";
	//window.location.href = "grafica2.html";
	return false;
	
	$.ajax({
		url: 'grafica.html',
		type: 'POST',
		dataType: 'html',
		data: {param1: 'value1'},
	})
	.done(function(data) {
		$('#grafica').html(data);
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	

	/*$.ajax({
		url: 'php/funciones.ajax.php',
		type: 'POST',
		dataType: 'json',
		data: { antec: array_act , tiempo: array_tiempo , valida: valida , ac:'grafica'},
		async: false,
		beforeSend: function(){
			//alert('aca');
		}
	})
	.done(function(data) {
		//console.log(data);
		$('#grafica').html(data.html);
		habilitar_div(data.info_arreglada);
		//$('#step_two').hide();
	})
	.fail(function(x,y,z) {
		console.log(x);
		console.log(y);
		console.log(z);
	})
	.always(function() {
		console.log("complete");
	});*/
	
}

function graficar_avanzado()
{
	result = alista_info_avanzado();
	valida = result[2];
	presupuesto = result[12];
	/*array_act = result[0];
	array_tiempo = result[1];*/
	tiempos = result[7];
	array_tiempo = result[7];
	array_act = Array(tiempos.length);
	array_tiempo = Array(tiempos.length);
	array_nombre = Array(tiempos.length);
	array_varianza = Array(tiempos.length);
	array_desviacion = Array(tiempos.length);
	array_t_prob = Array(tiempos.length);
	array_t_pes = Array(tiempos.length);
	array_t_opt = Array(tiempos.length);
	array_t_opt = Array(tiempos.length);
	array_costo = Array(tiempos.length);

	for (var i = 0; i < tiempos.length; i++) 
	{
		array_act[i] 		= result[0][i];
		array_tiempo[i] 	= result[7][i];
		array_nombre[i] 	= result[10][i];
		array_t_opt[i] 		= result[3][i];
		array_t_prob[i] 	= result[5][i];
		array_t_pes[i] 		= result[4][i];
		array_desviacion[i]	= result[8][i];
		array_varianza[i]	= result[9][i];
		array_costo[i]		= result[13][i];

	}
	console.log(tiempos);
	console.log(array_tiempo);

	localStorage["actividad"] 	= JSON.stringify(array_act);
	localStorage["tiempo"] 		= JSON.stringify(array_tiempo);
	localStorage["validacion"] 	= JSON.stringify(valida);
	localStorage["nombre"] 		= JSON.stringify(array_nombre);
	localStorage["fecha"] 		= JSON.stringify(result[11]);
	localStorage["cantidad"] 	= i;
	localStorage["optimista"] 	= JSON.stringify(array_t_opt);
	localStorage["pesimista"] 	= JSON.stringify(array_t_pes);
	localStorage["probable"] 	= JSON.stringify(array_t_prob);
	localStorage["varianza"] 	= JSON.stringify(array_varianza);
	localStorage["desviacion"] 	= JSON.stringify(array_desviacion);
	localStorage["costo"] 		= JSON.stringify(array_costo);
	localStorage["presupuesto"] = JSON.stringify(presupuesto);

	//console.log(result);return false;

	window.location.href = "grafica.html";
	//window.location.href = "grafica2.html";
	return false;
	
	$.ajax({
		url: 'grafica.html',
		type: 'POST',
		dataType: 'html',
		data: {param1: 'value1'},
	})
	.done(function(data) {
		$('#grafica').html(data);
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});	
}

jQuery.fn.scrollTo = function(time){
  var t = $(this).offset().top;
  if(t > 10){t = t - 10}
  if(time == 'fast'){time = 400}
  if(time == 'medium'){time = 800}
  if(time == 'slow'){time = 1200}
  if(time == null){time = 1000}
  $('html,body').animate({scrollTop: t}, time);
}

function cargar_concepto(valor)
{
	var code;
	switch(valor) {
    case 'edt':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;EDT</h2><div><div class="col-md-4 about-text-left"><p align="justify">Llamada tambi&eacute;n estructura desglosada de trabajo, es la estructura jer&aacute;rquica y descendente de las partidas o paquetes de trabajo que se deber&aacute;n realizar durante la implementaci&oacute;n de un proyecto para lograr sus objetivos.</p><div><img alt="" src="images/EDT.jpg" style="height:100%; position:relative;width:100%" /></div><p align="justify"><b>Pasos para su construcci&oacute;n:</b><br /><br />- Primero defina el producto Final (Objetivo espec&iacute;fico).<br />- Defina etapas o divisiones funcionales.<br />- Identificar los entregables espec&iacute;ficos del producto.<br />- Identificar actividades claves y de apoyo.</p></div></div></div>';
        break;
    case 'actividad':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Actividades</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">La definici&oacute;n de actividades consiste en identificar cu&aacute;les son las acciones que se deben llevar a cabo para conseguir los entregables de un proyecto.<br /><br />Una vez creada la EDT, se obtiene el nivel m&aacute;s bajo de esta descomposici&oacute;n, denominado PAQUETES DE TRABAJO. La descomposici&oacute;n de &eacute;stos en componentes m&aacute;s peque&ntilde;os nos proporciona las ACTIVIDADES necesarias para ejecutar los paquetes de trabajo.</p><p align="left"><b>Entradas:</b>- Plan de gesti&oacute;n del cronograma.<br />- L&iacute;nea base del Alcance.<br />- Activos de los procesos de la Organizaci&oacute;n.<br />- Factores Ambientales.</p><p align="Right"><b>Herramientas y T&eacute;cnicas:</b><br />- Descomposici&oacute;n EDT.<br />- Planificaci&oacute;n gradual.<br />- Juicio de expertos.</p><p align="Left"><b>Salidas:</b>- Lista de Actividades.<br />- Atributos de la Actividad.<br />- Listado de hitos.</p></div></div></div>';
        break;

    case 'cronograma':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Cronograma</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">Es la descripci&oacute;n espec&iacute;fica de las actividades y del tiempo que se va a emplear para la ejecuci&oacute;n del proyecto. Se debe organizar el trabajo en fechas probables, para saber cu&aacute;nto tiempo requerir&aacute; elaborar el trabajo definitivo.</p><div><img alt="" src="img/cronograma.png" style="height:100%; position:relative;width:100%" /></div><p align="justify">Actividad Predecesora:<br />- Es una actividad que se debe comenzar o terminar antes de que otra pueda comenzar.<br /><br />Actividad Sucesora:<br />- Es una actividad que depende del comienzo o del fin de una tarea precedente.<br /><br />Actividad de resumen:<br />- Son aquellas que se componen de subtareas y resume esas subtareas.</p><p align="justify"><b>Paso para elaborar la planeaci&oacute;n de actividades:</b><br /><br />- Listar las actividades en columna.<br />- Identificar el tiempo disponible para el proyecto indicado.<br />- Calcular el tiempo para cada actividad.<br />- Reordenar cronol&oacute;gicamente.<br />- Ajustar tiempo o secuencia de actividades.</p></div></div></div>';
        break;

    case 'pert':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;PERT</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">T&eacute;cnica que permite dirigir la programaci&oacute;n del proyecto. El m&eacute;todo PERT consiste en la representaci&oacute;n gr&aacute;fica de una red de tareas, que, cuando se colocan en cadena, permiten alcanzar los objetivos de un proyecto.</p><p align="justify"><b>El m&eacute;todo PERT debe incluir:</b><br /><br />- Desglose preciso del proyecto en tareas.<br />- C&aacute;lculo de la duraci&oacute;n de cada tarea.<br />- La designaci&oacute;n de un director del proyecto que se haga cargo de asegurar la supervisi&oacute;n de dicho proyecto, de informar, en caso de ser necesario, y de tomar decisiones en caso de que existan variaciones de las proyecciones.<br /><br /><b>Red PERT</b></p><div><img alt="" src="img/redpert.png" style="height:100%; position:relative;width:100%" /></div><p align="justify">Tareas: Representadas por una flecha. Se le asigna a cada una de las tareas un c&oacute;digo y una duraci&oacute;n. Sin embargo, la longitud de la flecha es independiente de la duraci&oacute;n de la tarea.<br /><br />Etapas: es decir, el inicio y el final de la tarea. Cada tarea tiene una etapa de inicio y una de finalizaci&oacute;n. Con excepci&oacute;n de las etapas iniciales y finales, cada etapa final es una etapa de inicio de la siguiente tarea. Las etapas generalmente est&aacute;n numeradas y representadas por un c&iacute;rculo, pero en algunos otros casos pueden estar representadas por otras formas (cuadrados, rect&aacute;ngulos, &oacute;valos, etc.).<br /><br />Tareas ficticias: representadas por una flecha punteada que indica las limitaciones de las cadenas de tareas entre ciertas etapas.</p></div></div></div>';
        break;

    case 'holgura':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Holgura</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">Las cadenas no cr&iacute;ticas disponen de un sobrante de tiempo para su ejecuci&oacute;n, dando lugar al estudio de las HOLGURAS. La holgura de un suceso es el margen de tiempo que se tiene para alcanzar dicho suceso. Cuando este margen es nulo, se dice que el suceso es cr&iacute;tico</p><div><img alt="" src="img/holgura.png" style="height:100%; position:relative;width:100%" /></div></div></div></div>';
        break;

    case 'r_critica':
        code = '<div id="content_dialog"><h2>&nbsp;&nbsp;Ruta Critica</h2><div class="inner" id="step_one"><div class="col-md-4 about-text-left"><p align="justify">En administraci&oacute;n y gesti&oacute;n de proyectos, una ruta cr&iacute;tica es la secuencia de los elementos terminales de la red de proyectos con la mayor duraci&oacute;n entre ellos, determinando el tiempo m&aacute;s corto en el que es posible completar el proyecto. La duraci&oacute;n de la ruta cr&iacute;tica determina la duraci&oacute;n del proyecto entero. Cualquier retraso en un elemento de la ruta cr&iacute;tica afecta a la fecha de t&eacute;rmino planeada del proyecto, y se dice que no hay holgura en la ruta cr&iacute;tica.</p><div><img align="right" alt="" src="img/logocpm.png" style="height:25; position:relative;width:27" /></div>&nbsp;<div><img alt="" src="img/rutacpm.png" style="height:100%; position:relative;width:100%" /></div></div></div></div>';
        break;
}
	$('#dialog_message_concept').html(null);
	$('#dialog_message_concept').html(code);
	
	$('#dialog_message_concept').dialog("open");
	$('#header').scrollTo('fast');
}

function validaremail(formulario) { 
	if (formulario.indexOf('@') == -1) {
		$('#dialog-message').html('La \"Direcci&oacute;n de Email\" no es correcta.');
		$('#dialog-message').dialog("open");
		return 0;
	}
	return 1;
	 
} 

function enviar_contacto()
{
	console.log($('#n_proyecto').val());
	if( $('#n_proyecto').val() == '' 
		|| $('#n_gerente').val() == '' 
		|| $('#presupuesto').val() == '' 
		|| $('#obj').val() == '' )
	{	
		$('#dialog-message').attr('title','Upss... algo no está bien');
		$('#dialog-message').html('Debe diligenciar toda la informaci&oacute;n del formulario de contacto.');
		$('#dialog-message').dialog("open");
	}else{
		if(validaremail($('#presupuesto').val()) != 0){
			$('#dialog-message').attr('title','Mensaje Enviado');
			$('#dialog-message').html('Su mensaje ha sido recibido, en breve estaremos dando respuesta a su solicitud.');
			$('#dialog-message').dialog("open");
			$('#n_proyecto').val(null);
			$('#n_gerente').val(null);
			$('#presupuesto').val(null);
			$('#obj').val(null);
		}
	}

}

/*Funciones para guardado y recuperacion de la informacion*/

function abrir_proyectos()
{
	//console.log(id_device);
	//id_device = '859fe2848923a8fd';
	$.ajax({
		async: true,
	  //url: 'php/servicio.php',
      url: 'http://www.sialen.com/webservice/servicio.php',
      type: 'POST',
      dataType: 'json',
      data: {ac: 'abrir', id: id_device },
	})
	.done(function(result) {
		console.log(result);
		$('.view-port').html(result.data);
	})
	.fail(function(result, x, y) { 
		$('.view-port').html(result.data);
		console.log(result);
		console.log(x);
		console.log(y);

	});	
}

function cargar_proyectos(complejo, id_proyecto)
{
	localStorage['id_proyecto'] = id_proyecto;
	if(complejo==1)
	{
		window.location="pert.html";
	}else{
		window.location="pert_avanzado.html";
	}
}

function cargar_detalle_proyecto(complejo, id_proyecto)
{

	$.ajax({
	  //url: 'php/servicio.php',
      url: 'http://www.sialen.com/webservice/servicio.php',
      type: 'POST',
      dataType: 'json',
      data: {ac: 'detalle1', id: id_proyecto },
	})
	.done(function(result) {
		console.log(result);
		resultado = result;

		console.log(resultado.data[0]);
		if(resultado.data[0]['Nombre_Medida'] == 'Hora')
		{
			medida = 'h';
		}else{
			medida = 'd';
		}
		$('#n_proyecto').val(resultado.data[0]['Nombre_Proyecto']);
		$('#n_gerente').val(resultado.data[0]['Nombre_Gerente']);
		$('#f_inicio').val(resultado.data[0]['Fecha_Inicio']);
		$('#m_tiempo').val(medida);
		$('#obj').val(resultado.data[0]['Descripcion_Proyecto']);

		$('#cargar').text('Siguiente');
		$('#cargar_a').text('Siguiente');

		$('#n_proyecto').attr('readonly', true);
		$('#n_gerente').attr('readonly', true);
		$('#f_inicio').attr('readonly', true);
		$('#m_tiempo').attr('readonly', true);
		$('#obj').attr('readonly', true);

		if(complejo == 2)
		{
			$('#presupuesto').val(resultado.data[0]['Presupuesto_Proyecto']);
			$('#presupuesto').attr('readonly', true);
		}
	})
	.fail(function(result) {
		console.log(result);
		resultado = JSON.parse(result.responseText);

		console.log(resultado.data[0]);
		if(resultado.data[0]['Nombre_Medida'] == 'Hora')
		{
			medida = 'h';
		}else{
			medida = 'd';
		}
		$('#n_proyecto').val(resultado.data[0]['Nombre_Proyecto']);
		$('#n_gerente').val(resultado.data[0]['Nombre_Gerente']);
		$('#f_inicio').val(resultado.data[0]['Fecha_Inicio']);
		$('#m_tiempo').val(medida);
		$('#obj').val(resultado.data[0]['Descripcion_Proyecto']);

		$('#cargar').text('Siguiente');
		$('#cargar_a').text('Siguiente');

		$('#n_proyecto').attr('readonly', true);
		$('#n_gerente').attr('readonly', true);
		$('#f_inicio').attr('readonly', true);
		$('#m_tiempo').attr('readonly', true);
		$('#obj').attr('readonly', true);

		if(complejo == 2)
		{
			$('#presupuesto').val(resultado.data[0]['Presupuesto_Proyecto']);
			$('#presupuesto').attr('readonly', true);
		}

	});	
	

}

function cargar_detalle_actividades(complejo, id_proyecto)
{	
	var valores;

	$.ajax({
	  async: false,
	  //url: 'php/servicio.php',
      url: 'http://www.sialen.com/webservice/servicio.php',
      type: 'POST',
      dataType: 'json',
      data: {ac: 'detalle2', id: id_proyecto },
	})
	.done(function(result) {
		console.log('aca1');
		localStorage['abrir'] = JSON.stringify(result);
		console.log(localStorage['abrir']);
	})
	.fail(function(result) { 
		localStorage['abrir'] = JSON.stringify(result);
	});	
	return valores;
}


$(document).ready(function(){
	var cantidad = 0;
	id_device = localStorage["id_device"];
	localStorage['abrir']=null;
	$('#cargar').click(function(){
		todoCorrecto=true;
		console.log($('#n_proyecto').val() + " - "+ $('#n_gerente').val().length + " - "+ /^\s*$/.test($('#nombre_p').val()) + " - " + $('#m_tiempo').val() + " - " + $('#f_inicio').val());
	 	if ($('#n_proyecto').val() == null 
	 		|| $('#n_gerente').val().length == 0 
	 		|| /^\s*$/.test($('#nombre_p').val())
	 		|| $('#m_tiempo').val() == '' 
	 		|| $('#f_inicio').val() == null
	 		|| $('#f_inicio').val() == '' ){
       		todoCorrecto=false;
       	}

		cantidad = 2;
		if(cantidad>0 && todoCorrecto)
		{
			localStorage["n_proyecto"] = $('#n_proyecto').val();
			localStorage["n_gerente"] = $('#n_gerente').val();
			localStorage["m_tiempo"] = $('#m_tiempo').val();
			localStorage["objetivo"] = $('#obj').val();
			$('#error').html(null);
			$('#actividades').html(null);
			$('#actividades').show();
			$('#actividades').append('<div id="blanco"></div><h4>Tiempos Actividades:</h4><div class="contact-text" id="content_activities" ></div>');
			if($('#m_tiempo').val() == 'd' )
			{
				medida_tiempo = "D&iacute;as";
			}else{
				medida_tiempo = "Horas";				
			}
			cargar_actividades(cantidad, medida_tiempo);
			$('#info_proyecto').hide();

		}else{
			$('#dialog-message').html('Debe completar la informaci&oacute;n del formulario');
			$('#dialog-message').dialog("open");
		}
		
	});

	$('#cargar_a').click(function(){ 
		todoCorrecto=true;
	 	if ($('#n_proyecto').val() == null 
	 		|| $('#n_gerente').val().length == 0 
	 		|| /^\s*$/.test($('#nombre_p').val())
	 		|| $('#m_tiempo').val() == ''
	 		|| $('#f_inicio').val() == null
	 		|| $('#f_inicio').val() == '' 
	 		|| $('#presupuesto').val() == ''
	 		|| $('#presupuesto').val() == null ){
       		todoCorrecto=false;
       	}

		cantidad = 2;
		if(cantidad>0 && todoCorrecto)
		{
			localStorage["n_proyecto"] = $('#n_proyecto').val();
			localStorage["n_gerente"] = $('#n_gerente').val();
			localStorage["m_tiempo"] = $('#m_tiempo').val();
			localStorage["objetivo"] = $('#obj').val();

			$('#error').html(null);
			$('#actividades').html(null);
			$('#actividades').show();
			$('#actividades').append('<div id="blanco"></div><h4>Tiempos Actividades</h4><div class="contact-text" id="content_activities" ></div>');
			if($('#m_tiempo').val() == 'd' )
			{
				medida_tiempo = "D&iacute;as";
			}else{
				medida_tiempo = "Horas";				
			}
			cargar_actividades_avanzado(cantidad, medida_tiempo);
			$('#info_proyecto').hide();

		}else{
			//$('#error').html('Debe completar la información del formulario');
			$('#dialog-message').html('Debe completar la informaci&oacute;n del formulario');
			$('#dialog-message').dialog("open");
		}
		
	});


	
	/*Menu*/

	function ingresar(){
		window.location.replace("menu.html");
	}

	$('#menu_pert').click(function(){
		localStorage['id_proyecto'] = null;
		window.location="menu_pert.html";
	});

	$('#menu_concepto').click(function(){
		localStorage['id_proyecto'] = null;
		window.location="menu_pert.html";
	});

	$('#menu_contacto').click(function(){
		window.location="contactenos.html";
	});

	$('#menu_pert_int').click(function(){
		window.location="pert_avanzado.html";
	});

	$('#menu_basico_int').click(function(){
		window.location="pert.html";
	});

	$('#menu_abrir_int').click(function(){
		window.location="abrir_pert.html";
	});

	$('#menu_concepto').click(function(){
		window.location="conceptos.html";
	});

	$('#graficar').click(function(){ alert('aca');
		graficar_pert();
	});
	
});
