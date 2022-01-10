.PHONY: new
default: help

test.txt: index.txt
	cat index.txt > test.txt
# 创建新的插件
new:
	node ./make/create-plugin.js $(filter-out $@,$(MAKECMDGOALS))
help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake new <plugin-name> [中文名]\033[0m\t---  创建新插件 plugin. 例如 'make new test 插件'"