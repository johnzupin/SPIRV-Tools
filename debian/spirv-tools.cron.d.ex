#
# Regular cron jobs for the spirv-tools package
#
0 4	* * *	root	[ -x /usr/bin/spirv-tools_maintenance ] && /usr/bin/spirv-tools_maintenance
