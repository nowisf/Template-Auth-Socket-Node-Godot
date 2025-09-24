extends Node

signal nombre_usuario_establecido(nombre)

var nombre_usuario:String

func establecer_nombre_usuario(nombre:String):
	nombre_usuario = nombre
	nombre_usuario_establecido.emit(nombre)
